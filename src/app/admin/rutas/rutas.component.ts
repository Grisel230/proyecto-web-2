import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RutasService} from "../../services/rutas.service";
import {CiudadesService} from "../../services/ciudades.service";
import {FormsModule} from "@angular/forms";

declare var bootstrap: any;
@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css'
})
export class RutasComponent implements OnInit{
  rutas: any[] = [];
  ciudades: any[] = [];
  newRuta = { origen: '', destino: '', distancia: 0 }; // Modelo para nueva ruta
  selectedRuta: any = { origen: '', destino: '', distancia: 0 }; // Modelo para ruta seleccionada
  rutaToDelete: number | null = null; // ID de la ruta a
  constructor(private rutasService: RutasService, private ciudadesService: CiudadesService) {}

  ngOnInit(): void {
    this.loadRutas();
    this.loadCiudades();
  }

  loadRutas() {
    this.rutasService.getRutas().subscribe((data) => {
      console.log(data);
      this.rutas = data;
    });
  }

  loadCiudades() {
    this.ciudadesService.getCiudades().subscribe((data) => {
      console.log(data);
      this.ciudades = data;
    });
  }

  addRuta() {
    if (this.newRuta.origen && this.newRuta.destino && this.newRuta.distancia > 0) {
      this.rutasService.createRuta(this.newRuta).subscribe(() => {
        this.loadRutas(); // Recargar lista
        this.newRuta = { origen: '', destino: '', distancia: 0 }; // Limpiar formulario
      });
    } else {
      alert('Completa todos los campos correctamente.');
    }
  }

  openEditModal(ruta: any) {
    this.selectedRuta = { ...ruta }; // Copiar la ruta seleccionada
  }

  updateRuta() {
    if (this.selectedRuta.origen && this.selectedRuta.destino && this.selectedRuta.distancia > 0) {
      this.rutasService.updateRuta(this.selectedRuta.id, this.selectedRuta).subscribe(() => {
        this.loadRutas(); // Recargar lista
        this.selectedRuta = {origen: '', destino: '', distancia: 0}; // Limpiar el modelo seleccionado
      });
    } else {
      alert('Completa todos los campos correctamente.');
    }
  }

  deleteRuta(id: number) {
    if (confirm('¿Estás seguro de eliminar esta ruta?')) {
      this.rutasService.deleteRuta(id).subscribe(() => {
        this.loadRutas(); // Recargar lista
      });
    }
  }

  openDeleteModal(id: number) {
    this.rutaToDelete = id; // Establece el conductor a eliminar
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.rutaToDelete !== null) {
      this.rutasService.deleteRuta(this.rutaToDelete).subscribe(() => {
        this.loadRutas(); // Recargar lista
        this.rutaToDelete = null; // Limpiar el ID del conductor
      });
    }
  }
}
