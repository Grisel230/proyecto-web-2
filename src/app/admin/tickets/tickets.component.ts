import { Component } from '@angular/core';
import {TicketsService} from "../../services/tickets.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: any[] = [];

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketsService.getTickets().subscribe({
      next: (data) => {
        this.tickets = data;
        console.log('Tickets cargados:', this.tickets);
      },
      error: (err) => {
        console.error('Error al cargar tickets:', err);
      },
    });
  }

  getStatus(status: number): string {
    switch (status) {
      case 1:
        return 'Pagado';
      case 2:
        return 'Reservado';
      default:
        return 'Desconocido';
    }
  }
}
