import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

export interface ApiResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  apiUrl: string = environment.baseUrl;
  redirectUrlGoogle: string = environment.redirectUrlGoogle;
  socialPostBackend: string = environment.socialPostBackend;
  frontRedirect: string = environment.frontRedirect;

  public $refreshToken = new Subject<boolean>;
  public $refreshTokenReceived = new Subject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.$refreshToken.subscribe((res: any) => {
      this.refreshToken();
    });
  }


  //
  //
  // Continue With Google
  //
  // 
  async continueWithGoogle(): Promise<void> {

    try {

      const res: any = await this.http.get<any>(this.apiUrl + this.redirectUrlGoogle + this.frontRedirect).toPromise();

      window.location.replace(res.authorization_url);

    } catch (error) {
      throw error;
    }
  }

  //
  //
  // Google Redirect
  //
  //
  async handleGoogleRedirect(code: string, state: string): Promise<void> {

    const formData = new FormData();
    formData.append('code', code);
    formData.append('state', state);

    try {
      const body: {
        state: string;
        code: string;
        [key: string]: string;
      } = { state: state, code: code };

      const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      const response = await this.http.post<ApiResponse>(this.apiUrl + this.socialPostBackend, formBody, { headers }).toPromise();

      if (response) {
        const accessToken = response.access;
        const refreshToken = response.refresh;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        this.router.navigateByUrl('/')
      }

    } catch (error) {
      throw error;
    }
  }
  //
  //
  // Login
  //
  //
  async login(email: string, password: string): Promise<void> {


    try {
      const body = { email: email, password: password };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      const response = await this.http.post<any>(this.apiUrl + "auth/jwt/create/", body, { headers }).toPromise();

      if (response) {
        const accessToken = response.access;
        const refreshToken = response.refresh;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        this.router.navigateByUrl('/')

      }
    } catch (error) {
      throw error;
    }
  }

  //
  //
  // Refresh Token
  // 
  //
  async refreshToken(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    const body = { refresh: refreshToken };

    try {
      const response = await this.http.post<any>(this.apiUrl + "auth/jwt/refresh/", body).toPromise();
      const accessToken = response.access;
      const newRefreshToken = response.refresh;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      this.$refreshTokenReceived.next(true);

    } catch (error) {
      throw error;
    }
  }

  //
  //
  // Get Token
  //
  //
  getToken(): any | null {
    const tokenString = localStorage.getItem('accessToken');

    //console.log("ku je re  " + tokenString)
    if (tokenString) {
      return JSON.parse(tokenString);
    }
    return null;
  }

  //
  //
  // Get View User
  //
  //
  getViewUser() {
    return this.http.get<any>(this.apiUrl + "auth/users/me/")
  }

}