import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutobusesService {
  private apiUrl = 'http://localhost:4300/api/autobuses';

  constructor(private http: HttpClient) {}

  getAutobuses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createAutobus(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateAutobus(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteAutobus(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
