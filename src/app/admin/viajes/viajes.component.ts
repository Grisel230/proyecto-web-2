import { Component } from '@angular/core';
import {RutasService} from "../../services/rutas.service";
import {TripsService} from "../../services/trips.service";
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AutobusesService} from "../../services/autobuses.service";
import {ConductoresService} from "../../services/conductores.service";

declare var bootstrap: any;
@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    FormsModule
  ],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})
export class ViajesComponent {
  viajes: any[] = [];
  rutas: any[] = [];
  vehiculos: any[] = [];
  conductores: any[] = [];
  newViaje = {id_ruta: '', id_vehiculo: '', id_conductor: '', fecha_salida: '', hora_salida: '', precio: 0};
  selectedViaje: any = {
    id_ruta: '',
    id_vehiculo: '',
    id_conductor: '',
    fecha_salida: '',
    hora_salida: '',
    precio : 0
  };
  viajeToDelete: number | null = null;

  constructor(
    private viajesService: TripsService ,
    private rutasService: RutasService,
    private vehiculosService: AutobusesService,
    private conductoresService: ConductoresService
  ) {
  }

  ngOnInit(): void {
    this.loadViajes();
    this.loadRutas();
    this.loadVehiculos();
    this.loadConductores();
  }

  // Cargar viajes
  loadViajes() {
    this.viajesService.getViajes().subscribe({
      next: (data) => {
        console.log(data);
        this.viajes = data;
      },
      error: (err) => {
        console.error('Error al cargar viajes:', err);
      }
    });
  }

  // Cargar rutas
  loadRutas() {
    this.rutasService.getRutas().subscribe({
      next: (data) => {
        this.rutas = data;
      },
      error: (err) => {
        console.error('Error al cargar rutas:', err);
      }
    });
  }

  // Cargar vehículos
  loadVehiculos() {
    this.vehiculosService.getAutobuses().subscribe({
      next: (data) => {
        this.vehiculos = data;
      },
      error: (err) => {
        console.error('Error al cargar vehículos:', err);
      }
    });
  }

  // Cargar conductores
  loadConductores() {
    this.conductoresService.getConductores().subscribe({
      next: (data) => {
        this.conductores = data;
      },
      error: (err) => {
        console.error('Error al cargar conductores:', err);
      }
    });
  }


  // Agregar nuevo viaje
  addViaje() {
    if (
      this.newViaje.id_ruta &&
      this.newViaje.id_vehiculo &&
      this.newViaje.id_conductor &&
      this.newViaje.fecha_salida
    ) {
      this.viajesService.createViaje(this.newViaje).subscribe({
        next: () => {
          this.loadViajes();
          this.newViaje = {
            id_ruta: '',
            id_vehiculo: '',
            id_conductor: '',
            fecha_salida: '',
            hora_salida: '',
            precio: 0
          };
        },
        error: (err) => {
          console.error('Error al agregar viaje:', err);
        }
      });
    } else {
      alert('Completa todos los campos correctamente.');
    }
  }

  // Abrir modal para editar viaje
  openEditModal(viaje: any) {
    this.selectedViaje = {...viaje};
    const modalElement = document.getElementById('editViajeModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Actualizar viaje existente
  updateViaje() {
    if (
      this.selectedViaje.id_ruta &&
      this.selectedViaje.id_vehiculo &&
      this.selectedViaje.id_conductor &&
      this.selectedViaje.fecha_salida
    ) {
      this.viajesService.updateViaje(this.selectedViaje.id, this.selectedViaje).subscribe({
        next: () => {
          this.loadViajes();
          this.selectedViaje = {
            id_ruta: '',
            id_vehiculo: '',
            id_conductor: '',
            fecha_salida: '',
            hora_salida: '',
            precio: 0
          };
        },
        error: (err) => {
          console.error('Error al actualizar viaje:', err);
        }
      });
    } else {
      alert('Completa todos los campos correctamente.');
    }
  }

  // Abrir modal de confirmación para eliminar viaje
  openDeleteModal(viajeId: number) {
    this.viajeToDelete = viajeId;
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Confirmar eliminación de viaje
  confirmDelete() {
    if (this.viajeToDelete !== null) {
      this.viajesService.deleteViaje(this.viajeToDelete).subscribe({
        next: () => {
          this.loadViajes();
          this.viajeToDelete = null;
        },
        error: (err) => {
          console.error('Error al eliminar viaje:', err);
        }
      });
    }
  }

  closeModal() {
    const modalElement = document.getElementById('editViajeModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.removeBackdrop();
  }

  removeBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}



