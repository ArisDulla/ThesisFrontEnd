import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  //
  // Issuance Passport
  //
  issuancePassport(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/issuance-passport/', formData);
  }

  //
  // Renewal Passport
  //
  renewalPassport(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/renewal-passport/', formData);
  }

  //
  // Replacement Passport
  //
  replacementPassport(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/replacement-passport/', formData);
  }

  //
  // Theft or Loss Passport
  //
  theftOrLossPassport(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/theftOrLoss-passport/', formData);
  }

  //
  // Issuance Minors Passport
  //
  issuanceMinorsPassport(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/issuanceMinors-passport/', formData);
  }



}
