import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {RutasComponent} from "./admin/rutas/rutas.component";
import {AutobusesComponent} from "./admin/autobuses/autobuses.component";
import {ConductoresComponent} from "./admin/conductores/conductores.component";
import {ReportesComponent} from "./admin/reportes/reportes.component";
import {
  CompraBoletosComponent
} from "./passenger/compra-boletos/compra-boletos.component";
import {
  VerificacionComponent
} from "./passenger/verificacion/verificacion.component";

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'admin/rutas', component: RutasComponent },
  { path: 'admin/autobuses', component: AutobusesComponent },
  { path: 'admin/conductores', component: ConductoresComponent },
  { path: 'admin/reportes', component: ReportesComponent },
  { path: 'passenger/compra-boletos', component: CompraBoletosComponent },
  { path: 'passenger/verificacion', component: VerificacionComponent },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' },
];
