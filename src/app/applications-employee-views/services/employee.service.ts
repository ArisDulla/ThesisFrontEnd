import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl: string = environment.baseUrl;
  variables_user: any = null;
  type_user: string | null = null;

  public $refreshToken = new Subject<boolean>;
  public $refreshTokenReceived = new Subject<boolean>;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {
    this.$refreshToken.subscribe((res: any) => {
      auth.refreshToken();
    });
  }
  //
  // GET LIST Issuance Passport
  //
  getIssuancePassport(): Observable<any> {
    this.variables_user = this.auth.getRoleUser();
    this.type_user = this.variables_user.type_user

    if (this.type_user == "employeeYP02") {
      return this.http.get<any>(this.apiUrl + 'api/issuance/list-employee-yp02/');
    } else {
      return this.http.get<any>(this.apiUrl + 'api/issuance/list-employee/');
    }
  }

  //
  // GET all LIST Issuance Passport
  //
  getAllIssuancePassport(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/issuance/list-employee/');
  }

  //
  // First Approval Application
  //
  first_approval_application(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}api/issuance/${id}/first_approval_application/`, { headers });
  }

  //
  // First Approval Application
  //
  final_approval_application(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}api/issuance/${id}/final_approval_application/`, { headers });
  }


  //
  // Rejected application
  //
  rejected_application(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}api/issuance/${id}/rejected_application/`, { headers });
  }

}
