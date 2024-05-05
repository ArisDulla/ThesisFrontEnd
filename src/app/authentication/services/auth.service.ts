import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

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


  constructor(private http: HttpClient, private router: Router,) { }

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

      const response = await this.http.post<ApiResponse>(this.apiUrl + this.socialPostBackend, formData).toPromise();
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
}
