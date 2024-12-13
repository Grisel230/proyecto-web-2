import { TripsService} from '../services/trips.service';
import {Component} from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged, map,
  Observable,
  OperatorFunction
} from "rxjs";
import {FormsModule} from "@angular/forms";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {TicketsService} from "../services/tickets.service";
import {CiudadesService} from "../services/ciudades.service";
import {RutasService} from "../services/rutas.service";
import {UserService} from "../services/user.service";


declare var bootstrap: any;

@Component({
  selector: 'app-trip-search',
  templateUrl: './trips-search.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgbTypeahead,
    DatePipe,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./trips-search.component.css']
})

export class TripSearchComponent {

  selectedRouteId: number | null = null; // ID de la ruta seleccionada
  startDate: string = '';
  endDate: string = '';
  trips: any[] = [];
  routes: any[] = [];
  selectedTrip: any = null; // Viaje seleccionado para ver detalles
  availableSeats: string[] = []; // Asientos disponibles para el viaje seleccionado
  selectedSeat: string = ''; // Asiento seleccionado por el usuario
  modal: any; // Referencia al modal

  constructor(private tripService: TripsService, private userService: UserService,
              private rutasService: RutasService, private ticketService: TicketsService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes() {
    this.rutasService.getRutas().subscribe((data) => {
      this.routes = data;
    });
  }

  searchTrips() {
    if (!this.selectedRouteId) {
      alert('Por favor, selecciona una ruta.');
      return;
    }
    this.tripService.searchTrips(this.selectedRouteId, this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.trips = data;
        console.log('Viajes encontrados:', this.trips);
      },
      error: (err) => {
        console.error('Error al buscar viajes:', err);
      }
    });
  }

  showDetails(trip: any) {
    this.selectedTrip = trip; // Establecer el viaje seleccionado
    this.loadAvailableSeats(trip.id); // Cargar asientos disponibles
    const modalElement = document.getElementById('tripDetailsModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement, { backdrop: 'static' });
      this.modal.show();
    }
  }

  loadAvailableSeats(tripId: number) {
    this.tripService.getAvailableSeats(tripId).subscribe({
      next: (seats) => {
        this.availableSeats = seats;
        console.log('Asientos disponibles:', this.availableSeats);
      },
      error: (err) => {
        console.error('Error al cargar asientos:', err);
      }
    });
  }

  reserveSeat() {
    if (!this.selectedSeat) {
      alert('Por favor selecciona un asiento.');
      return;
    }

    const userId = this.userService.getUser().id; // Asegúrate de que este método retorna el usuario actual
    this.ticketService.reserveSeat(this.selectedTrip.id, this.selectedSeat, userId).subscribe({
      next: () => {
        alert('Asiento reservado exitosamente.');
        this.loadAvailableSeats(this.selectedTrip.id); // Recargar asientos disponibles
        this.selectedSeat = ''; // Reiniciar el asiento seleccionado
        this.modal.hide();
      },
      error: (err) => {
        console.error('Error al reservar asiento:', err);
        alert('No se pudo reservar el asiento. Intenta de nuevo.');
      }
    });
  }
}
