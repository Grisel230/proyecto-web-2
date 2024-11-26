import {Component} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged, map,
  Observable,
  OperatorFunction
} from "rxjs";
import {FormsModule} from "@angular/forms";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FormsModule,
    NgbTypeahead
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  public cities: string[] = [
    'Aguascalientes',
    'Cancún',
    'Chetumal',
    'Chihuahua',
    'Ciudad de México',
    'Ciudad Juárez',
    'Culiacán',
    'Durango',
    'Guadalajara',
    'Hermosillo',
    'La Paz',
    'León',
    'Mazatlán',
    'Mexicali',
    'Monterrey',
    'Morelia',
    'Oaxaca',
    'Pachuca',
    'Puebla',
    'Querétaro',
    'Saltillo',
    'San Luis Potosí',
    'Tepic',
    'Tijuana',
    'Toluca',
    'Torreón',
    'Tuxtla Gutiérrez',
    'Veracruz',
    'Villahermosa',
    'Xalapa',
    'Zacatecas',
    'Acapulco',
    'Campeche',
    'Colima',
    'Ensenada',
    'Matamoros',
    'Nuevo Laredo',
    'Reynosa',
    'San Cristóbal de las Casas',
    'Tapachula',
    'Tlaxcala',
    'Uruapan',
  ];


  destiny: any;
  origin: any;

  public search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) => {
        const filteredCities = term.length < 1 ? ['No hay coincidencias'] : this.cities.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)

          return filteredCities.length ? filteredCities : ['No hay coincidencias'];
      }
      ),
    );

}
