import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConductoresService {
  private apiUrl = 'http://localhost:4300/api/conductores';

  constructor(private http: HttpClient) {}

  getConductores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createConductor(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateConductor(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteConductor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
