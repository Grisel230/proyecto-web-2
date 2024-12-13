import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ConductoresService} from "../../services/conductores.service";
declare var bootstrap: any;
@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent {
  conductores: any[] = [];
  newConductor = { nombre: '', telefono: '' }; // Modelo para el nuevo conductor
  selectedConductor: any = {nombre: '', telefono: ''}; // Modelo para el conductor seleccionado
  conductorToDelete: number | null = null;
  constructor(private conductoresService: ConductoresService) {}

  ngOnInit(): void {
    this.loadConductores();
  }

  loadConductores() {
    this.conductoresService.getConductores().subscribe((data) => {
      this.conductores = data;
    });
  }

  addConductor() {
    if (this.newConductor.nombre && this.newConductor.telefono) {
      this.conductoresService.createConductor(this.newConductor).subscribe(() => {
        this.loadConductores(); // Recargar lista
        this.newConductor = { nombre: '', telefono: '' }; // Limpiar formulario
      });
    } else {
      alert('Completa los campos correctamente.');
    }
  }

  openEditModal(conductor: any) {
    this.selectedConductor = { ...conductor }; // Copiar el conductor seleccionado
  }

  updateConductor() {
    if (this.selectedConductor.nombre && this.selectedConductor.telefono) {
      this.conductoresService.updateConductor(this.selectedConductor.id, this.selectedConductor).subscribe(() => {
        this.loadConductores(); // Recargar lista
        this.selectedConductor = {nombre: '', telefono: ''}; // Limpiar el modelo seleccionado
      });
    } else {
      alert('Completa los campos correctamente.');
    }
  }

  deleteConductor(id: number) {
    if (confirm('¿Estás seguro de eliminar este conductor?')) {
      this.conductoresService.deleteConductor(id).subscribe(() => {
        this.loadConductores(); // Recargar lista
      });
    }
  }

  openDeleteModal(id: number) {
    this.conductorToDelete = id; // Establece el conductor a eliminar
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.conductorToDelete !== null) {
      this.conductoresService.deleteConductor(this.conductorToDelete).subscribe(() => {
        this.loadConductores(); // Recargar lista
        this.conductorToDelete = null; // Limpiar el ID del conductor
      });
    }
  }


}
