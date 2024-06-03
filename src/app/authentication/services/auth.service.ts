import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  getRoleUser(): object | null {

    const tokenString = localStorage.getItem('refreshToken') as string;

    if (!tokenString) {
      return null;
    }

    try {

      const decodedToken: any = jwtDecode(tokenString);
      const roleUser = decodedToken.roleUser;
      const department_name = decodedToken.department_name;
      const department_id = decodedToken.department_id;
      const user_Id_X = decodedToken.user_Id_X;

      const user_info = {
        "type_user": roleUser,
        "department_name": department_name,
        "department_id": department_id,
        "user_id": user_Id_X
      }

      return user_info

    } catch (error) {
      return null;
    }
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

        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });
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

        const decodedToken: any = jwtDecode(accessToken);
        const roleUser = decodedToken.roleUser;
        if (roleUser == "cityzen") {

          this.router.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });
        } else if (roleUser == "employeeYP01" || roleUser == "employeeYP02" || roleUser == "employeeSEC") {
          this.router.navigate(['/dashboard-employee']).then(() => {
            window.location.reload();
          });
        }

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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    try {
      const response = await this.http.post<any>(this.apiUrl + "auth/jwt/refresh/", body, { headers }).toPromise();
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

  //
  //
  // Logout
  // 
  // 
  async logout(): Promise<void> {

    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {

      const body = { refresh_token: refreshToken };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      try {
        await this.http.post<any>(this.apiUrl + "logout/", body, { headers }).toPromise();

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        this.router.navigate(['/login'], { queryParams: { successMessage: "You have successfully logged out." } }).then(() => {
          window.location.reload();
        });

      } catch (error) {
        throw error;

      }
    }
  }
  //
  //
  // Update User
  //
  //
  updateUser(userData: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify(userData);

    return this.http.put<any>(this.apiUrl + "auth/users/me/", body, { headers })

  }

  //
  // Password Update
  //
  updatePassword(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify(userData);

    return this.http.post<any>(this.apiUrl + "auth/users/set_password/", body, { headers })
  }

  //
  // Get All Departments
  //
  getAllDepartments(url?: string): Observable<any> {
    const requestUrl = url || (this.apiUrl + "api/departments/");
    return this.http.get<any>(requestUrl);
  }

  getAllDepartmentsList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "api/departments/get_all/")
  }

  //
  // update Id Department Of User
  //
  updateIdDepartmentOfUser(IdDepartment: any, cityzen_id: Number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = { department: IdDepartment };

    //console.log(cityzen_id)
    return this.http.put<any>(`${this.apiUrl}api/cityzens/${cityzen_id}/update_department/`, body, { headers });
  }

  //
  // Reset Password
  //
  resetPassword(email: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = { email: email };

    return this.http.post<any>(this.apiUrl + "auth/users/reset_password/", body, { headers });

  }

  //
  // Reset Password Confirm
  //
  confirmResetPassword(token: any, uid: any, newPassword: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({
      uid: uid,
      token: token,
      new_password: newPassword
    });

    return this.http.post<any>(this.apiUrl + "auth/users/reset_password_confirm/", body, { headers });
  }

  //
  //
  // Register
  //
  //
  async register(registerForm: any): Promise<void> {


    try {
      const body = JSON.stringify(registerForm);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      const response = await this.http.post<any>(this.apiUrl + "auth/users/", body, { headers }).toPromise();

    } catch (error) {

      throw error;
    }
  }

  //
  // Activation Confirm
  //
  activationConfirm(token: any, uid: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({
      uid: uid,
      token: token,
    });

    return this.http.post<any>(this.apiUrl + "auth/users/activation/", body, { headers });
  }

  //
  // Password Update
  //
  delete(password: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({ current_password: password });

    return this.http.delete<any>(this.apiUrl + "auth/users/me/", { headers, body });

  }
  //
  // Get all Numbers Of User
  // 
  getNumbersOfUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "api/userPhoneNumber/list-user/")
  }

  //
  // Get 1 Number Of User
  // 
  getNumberOfUser(phoneNumber_id: any) {
    return this.http.get<any>(`${this.apiUrl}api/userPhoneNumber/${phoneNumber_id}/`)

  }

  //
  // Update Number Of User
  // 
  updateNumberOfUser(phoneNumber_id: any, phoneNumber: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = phoneNumber;
    return this.http.put<any>(`${this.apiUrl}api/userPhoneNumber/${phoneNumber_id}/`, body, { headers })

  }

  //
  // Add New Number Of User
  //
  addNewNumberOfUser(phoneNumber: any, userId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let phoneNumber_data = {}

    if (userId) {

      phoneNumber_data = {
        'user': userId,
        'phoneNumber': { "number": phoneNumber }
      }

    } else {

      phoneNumber_data = {
        'phoneNumber': { "number": phoneNumber }
      }

    }

    const body = phoneNumber_data;
    return this.http.post<any>(`${this.apiUrl}api/userPhoneNumber/`, body, { headers })
  }

  //
  // Delete Number of User
  //
  removeNumberOfUser(phoneNumber_id: any): Observable<any> {

    return this.http.delete<any>(`${this.apiUrl}api/userPhoneNumber/${phoneNumber_id}/`)
  }

  //
  // Get ALL Addresses Of User
  // 
  getAddressesOfUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "api/userAddress/list-user/")
  }

  //
  // Remove Address
  // 
  removeAddress(address_id: any): Observable<any> {

    return this.http.delete<any>(`${this.apiUrl}api/userAddress/${address_id}/`)

  }

  //
  // Add New Address
  // 
  addNewAddress(address_data: any, userId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let address = {}

    if (userId) {

      address = {
        'user': userId,
        'address': address_data
      }

    } else {

      address = {
        'address': address_data
      }

    }
    const body = address;
    return this.http.post<any>(`${this.apiUrl}api/userAddress/`, body, { headers })
  }

  //
  // Get 1 Address Of User
  // 
  getAddressOfUser(address_id: any) {
    return this.http.get<any>(`${this.apiUrl}api/userAddress/${address_id}/`)

  }

  //
  // Update Address Of User
  //  
  updateAddressOfUser(address: any, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = userData;
    return this.http.put<any>(`${this.apiUrl}api/userAddress/${address}/`, body, { headers })
  }


  //
  // Verify Token
  // 
  //
  verifyToken(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const body = { token: accessToken };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.apiUrl + "auth/jwt/verify/", body, { headers });
  }

}