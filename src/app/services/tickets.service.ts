import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = 'http://localhost:4300/api/tickets';

  constructor(private http: HttpClient) {}



  reserveSeat(tripId: number, seatNumber: string, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve`, { tripId, seatNumber, userId });
  }

  confirmPayment(ticketId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay`, { ticketId });
  }


  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
