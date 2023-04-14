import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  baseUrl = 'https://3kniis.sse.codesandbox.io/payments/'
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBpY3BheS13ZWIiLCJzdWIiOiI2MmI0YTk4MGVkYTY5ODVjNTNiN2ExY2UiLCJpYXQiOjE2ODEzODc0MTMsImV4cCI6MTY4MTQ3MzgxM30.iEtXsEe46I8wOIjvyxbuHEdZ_A5WyjEFi34xcKM6dPE'
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.headers });
  }

  create(dados: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, dados, { headers: this.headers });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`, { headers: this.headers });
  }

  editPayed(id: any, dados: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${id}`, dados, { headers: this.headers });
  }

  edit(id: any, dados: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${id}`, dados, { headers: this.headers });
  }


}
