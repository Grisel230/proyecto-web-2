import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private apiUrl = 'http://localhost:4300/api/ciudades';

  constructor(private http: HttpClient) {}

  getCiudades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCiudad(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateCiudad(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteCiudad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
