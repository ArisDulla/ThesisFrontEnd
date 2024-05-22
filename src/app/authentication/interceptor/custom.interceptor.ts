import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const authToken = localStorage.getItem('accessToken');
  let request = req

  // If a token exists, add it to the request headers
  if (authToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  // Allow requests with credential
  request = request.clone({
    withCredentials: true
  });

  //
  // Refresh token & Pass on the modified request 
  //
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {

      // If unauthorized error, prompt user to refresh session
      if (error.status === 401) {

        if (request.url.includes('auth/jwt/refresh')) {
          const isRefresh = window.alert("Your session has expired. Please login again.");

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          router.navigate(['/login'], { queryParams: { errorMessage: "Your session has expired. Please login again." } }).then(() => {
            window.location.reload();
          });

          throw new Error('RefreshTokenStop');

        } else {
          //
          //  Refresh token 
          //
          authService.$refreshToken.next(true);
        }
      }
      return throwError(error);
    })
  );
};