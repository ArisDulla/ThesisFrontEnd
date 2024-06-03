import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityzenService {

  apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,) { }

  //
  // GET all LIST Issuance Passport
  //
  getCityzens(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/cityzens/list-employee/');
  }

  getCityzen(cityzenId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}api/cityzens/${cityzenId}/`);
  }

  updateCityzen(cityzen: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}api/cityzens/${cityzen.id}/`, cityzen)
  }

  getNumbers(cityzenId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}api/userPhoneNumber/list-employee/${cityzenId}/`)
  }

  getAddressesOfUser(cityzenId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}api/userAddress/list-employee/${cityzenId}/`)

  }

}
