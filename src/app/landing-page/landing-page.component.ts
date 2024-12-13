import {Component} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged, map,
  Observable,
  OperatorFunction
} from "rxjs";
import {FormsModule} from "@angular/forms";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {TripSearchComponent} from "../trips-search/trips-search.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FormsModule,
    NgbTypeahead,
    TripSearchComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
