import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  baseUrl = 'https://3kniis.sse.codesandbox.io/payments/'
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBpY3BheS13ZWIiLCJzdWIiOiI2MmI0YTk4MGVkYTY5ODVjNTNiN2ExY2UiLCJpYXQiOjE2ODEzNjQ5MjYsImV4cCI6MTY4MTQ1MTMyNn0.jNdVXdYcMtL_NDRGEZ5qO13zVlyEZCC-KR2bvXTwrGg'
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.headers });
  }
}
