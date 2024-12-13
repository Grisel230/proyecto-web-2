import {Routes} from '@angular/router';
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
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "./guards/auth.guard";
import {checkAuthGuard} from "./guards/check-auth.guard";
import {CiudadesComponent} from "./admin/ciudades/ciudades.component";
import {ViajesComponent} from "./admin/viajes/viajes.component";
import {TicketsComponent} from "./admin/tickets/tickets.component";

export const routes: Routes = [
  {path: 'auth/login', component: LoginComponent, canActivate: [checkAuthGuard]},
  {path: 'auth/register', component: RegisterComponent, canActivate: [checkAuthGuard]},
  { path: 'admin', component: DashboardComponent, canActivate:[authGuard], children: [
      { path: 'rutas', component: RutasComponent },
      { path: 'viajes', component: ViajesComponent},
      { path: 'tickets', component: TicketsComponent},
      { path: 'ciudades', component: CiudadesComponent},
      { path: 'autobuses', component: AutobusesComponent },
      { path: 'conductores', component: ConductoresComponent },
      { path: 'reportes', component: ReportesComponent },
    ]
  },
  {path: 'passenger/compra-boletos', component: CompraBoletosComponent},
  {path: 'passenger/verificacion', component: VerificacionComponent},
  {path: '', component: LandingPageComponent},
  {path: '**', redirectTo: '/'},
];
