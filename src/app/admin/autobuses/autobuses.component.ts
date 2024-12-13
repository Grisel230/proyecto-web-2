import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AutobusesService} from "../../services/autobuses.service";
import {FormsModule} from "@angular/forms";
declare var bootstrap: any;

@Component({
  selector: 'app-autobuses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autobuses.component.html',
  styleUrl: './autobuses.component.css'
})
export class AutobusesComponent {

  autobuses: any[] = [];
  newBus = {placa: '', capacidad: 0}; // Modelo para el nuevo autobús
  selectedBus: any = { placa: '', capacidad: 0 };
  busToDelete: number | null = null;

  constructor(private autobusesService: AutobusesService) {
  }

  ngOnInit(): void {
    this.loadAutobuses();
  }

  loadAutobuses() {
    this.autobusesService.getAutobuses().subscribe((data) => {
      console.log(data);
      this.autobuses = data;
    });
  }

  addBus() {
    if (this.newBus.placa && this.newBus.capacidad > 0) {
      this.autobusesService.createAutobus(this.newBus).subscribe(() => {
        this.loadAutobuses(); // Recargar lista
        this.newBus = {placa: '', capacidad: 0}; // Limpiar formulario
      });
    } else {
      alert('Completa los campos correctamente.');
    }
  }

  openEditModal(bus: any) {
    this.selectedBus = {...bus}; // Copiar el autobús seleccionado
  }

  updateBus() {
    if (this.selectedBus.placa && this.selectedBus.capacidad > 0) {
      this.autobusesService.updateAutobus(this.selectedBus.id, this.selectedBus).subscribe(() => {
        this.loadAutobuses(); // Recargar lista
        this.selectedBus = null; // Limpiar el modelo seleccionado
      });
    } else {
      alert('Completa los campos correctamente.');
    }
  }


  openDeleteModal(id: number) {
    this.busToDelete = id; // Establece el autobús a eliminar
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
    modal.show();
  }

  confirmDelete() {
    if (this.busToDelete !== null) {
      this.autobusesService.deleteAutobus(this.busToDelete).subscribe(() => {
        this.loadAutobuses(); // Recargar lista después de eliminar
        this.busToDelete = null; // Limpiar el ID del autobús
      });
    }
  }
}
