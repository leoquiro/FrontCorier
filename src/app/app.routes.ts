import { Routes } from '@angular/router';
import { MainSearchComponent } from './main-search/main-search.component';
import { FlightResultsComponent } from './flight-results/flight-results.component';

export const routes: Routes = [
  { path: '', component: MainSearchComponent }, // Main search component
  { path: 'results', component: FlightResultsComponent } // Flight results component
];


