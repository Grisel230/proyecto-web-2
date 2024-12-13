import { Component } from '@angular/core';
import {CiudadesService} from "../../services/ciudades.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

declare var bootstrap: any;
@Component({
  selector: 'app-ciudades',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './ciudades.component.html',
  styleUrl: './ciudades.component.css'
})
export class CiudadesComponent {
  ciudades: any[] = [];
  newCiudad = { nombre: '' }; // Modelo para nueva ciudad
  selectedCiudad: any = {nombre: ''}; // Modelo para ciudad seleccionada
  ciudadToDelete: number | null = null; // ID de la ciudad a eliminar

  constructor(private ciudadesService: CiudadesService) {}

  ngOnInit(): void {
    this.loadCiudades();
  }

  loadCiudades() {
    this.ciudadesService.getCiudades().subscribe((data) => {
      this.ciudades = data;
    });
  }

  addCiudad() {
    if (this.newCiudad.nombre) {
      this.ciudadesService.createCiudad(this.newCiudad).subscribe(() => {
        this.loadCiudades(); // Recargar lista
        this.newCiudad = { nombre: '' }; // Limpiar formulario
      });
    } else {
      alert('El nombre de la ciudad es obligatorio.');
    }
  }

  openEditModal(ciudad: any) {
    this.selectedCiudad = { ...ciudad }; // Copiar la ciudad seleccionada
  }

  updateCiudad() {
    if (this.selectedCiudad.nombre) {
      this.ciudadesService.updateCiudad(this.selectedCiudad.id, this.selectedCiudad).subscribe(() => {
        this.loadCiudades(); // Recargar lista
        this.selectedCiudad = {nombre: ''}; // Limpiar el modelo seleccionado
      });
    } else {
      alert('El nombre de la ciudad es obligatorio.');
    }
  }

  openDeleteModal(id: number) {
    this.ciudadToDelete = id; // Establece la ciudad a eliminar
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.ciudadToDelete !== null) {
      this.ciudadesService.deleteCiudad(this.ciudadToDelete).subscribe(() => {
        this.loadCiudades(); // Recargar lista
        this.ciudadToDelete = null; // Limpiar el ID
      });
    }
  }
}
