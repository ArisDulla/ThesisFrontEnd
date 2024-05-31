import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class PassportViewService {

  apiUrl: string = environment.baseUrl;

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
    return this.http.get<any>(this.apiUrl + 'api/issuance/list-citizen/');
  }

  //
  // Get VIEW Issuance Passport
  // 
  getIssuancePassportView(id: any, application_type: any): Observable<any> {
    let endpoint: string;

    switch (application_type) {
      case 'Issuance':
        endpoint = 'issuance-passport';
        break;
      case 'Renewal':
        endpoint = 'renewal-passport';
        break;
      case 'Replacement':
        endpoint = 'replacement-passport';
        break;
      case 'TheftOrLoss':
        endpoint = 'theftOrLoss-passport';
        break;
      case 'IssuanceMinors':
        endpoint = 'issuanceMinors-passport';
        break;
      default:
        throw new Error('Invalid application type');
    }

    return this.http.get<any>(`${this.apiUrl}api/${endpoint}/${id}/`);
  }

  //
  // GET file
  //
  getIssuancePassportFile(docType: string, passportId: number, application_type: string): Observable<ArrayBuffer> {

    let endpoint: string;

    switch (application_type) {
      case 'Issuance':
        endpoint = 'issuance-passport';
        break;
      case 'Renewal':
        endpoint = 'renewal-passport';
        break;
      case 'Replacement':
        endpoint = 'replacement-passport';
        break;
      case 'TheftOrLoss':
        endpoint = 'theftOrLoss-passport';
        break;
      case 'IssuanceMinors':
        endpoint = 'issuanceMinors-passport';
        break;
      default:
        throw new Error('Invalid application type');
    }

    const url = `${this.apiUrl}api/${endpoint}/${passportId}/download-file/${docType}/`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ');

    return this.http.get(url, {
      responseType: 'arraybuffer',
      headers: headers
    });
  }

  //
  // Cancel Application
  //
  cancel_application(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}api/issuance/${id}/cancel_application/`, { headers });
  }

  //
  // Issuance Passport
  //
  issuancePassport(formData: any, application_type: any, passportId: any): Observable<any> {

    let endpoint: string;

    switch (application_type) {
      case 'Issuance':
        endpoint = 'issuance-passport';
        break;
      case 'Renewal':
        endpoint = 'renewal-passport';
        break;
      case 'Replacement':
        endpoint = 'replacement-passport';
        break;
      case 'TheftOrLoss':
        endpoint = 'theftOrLoss-passport';
        break;
      case 'IssuanceMinors':
        endpoint = 'issuanceMinors-passport';
        break;
      default:
        throw new Error('Invalid application type');
    }

    return this.http.put<any>(`${this.apiUrl}api/${endpoint}/${passportId}/`, formData);

  }

  //
  // GET LIST Passports
  //
  getPassports(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/passportInfo/list-citizen/');
  }


}
