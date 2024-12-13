import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private apiUrl = 'http://localhost:4300/api/trips';

  constructor(private http: HttpClient) {}


  searchTrips(routeId: number | null, startDate?: string, endDate?: string): Observable<any> {
    const params: any = {};
    if (routeId) params.routeId = routeId;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return this.http.get(`${this.apiUrl}/search`, { params });
  }




  getAvailableSeats(tripId: number): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:4300/api/tickets/seats/${tripId}`);
  }


  getViajes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createViaje(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateViaje(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteViaje(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
