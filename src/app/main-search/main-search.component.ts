// main-search.component.ts
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MainSearchService } from './main-search.service';
import { OutsideClickDirective } from '../directives/outside-click.directive';


@Component({
  selector: 'app-main-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    OutsideClickDirective,
  ],
})
export class MainSearchComponent implements OnInit {
  dep_iata: string = ''; // Departure IATA code
  arr_iata: string = ''; // Arrival IATA code
  dep_name: string = ''; // Departure Airport Name
  arr_name: string = ''; // Arrival Airport Name
  date: string = ''; // Flight date
  filteredDepAirports: any[] = []; // Array for filtered departure airport suggestions
  filteredArrAirports: any[] = []; // Array for filtered arrival airport suggestions
  allAirports: any[] = []; // Array to hold all airport data

  constructor(
    private router: Router,
    private mainSearchService: MainSearchService
  ) {}

  ngOnInit() {
    this.fetchAirports(); // Fetch airports once when the component initializes
  }

  fetchAirports() {
    // Fetch the airport data from the JSON file
    if (this.allAirports.length === 0) {
      // Check if data has already been fetched
      this.mainSearchService.getAirports().subscribe((data) => {
        this.allAirports = data; // Store the fetched airport data
      });
    }
  }

  searchFlights() {
    this.router.navigate(['/results'], {
      queryParams: {
        dep_iata: this.dep_iata,
        arr_iata: this.arr_iata,
        date: this.date,
      },
    });
  }

  filterDepAirports(input: string) {
    if (!this.allAirports || this.allAirports.length === 0) {
      return; // Exit early if no airports are available
    }

    if (input) {
      const lowerCaseInput = input.toLowerCase();
      this.filteredDepAirports = this.allAirports.filter((airport) => {
        const matchesName =
          airport.name && airport.name.toLowerCase().includes(lowerCaseInput);
        const matchesIATA =
          airport.iata && airport.iata.toLowerCase().includes(lowerCaseInput);
        const matchesCity =
          airport.city && airport.city.toLowerCase().includes(lowerCaseInput);
        const matchesCountry =
          airport.country &&
          airport.country.toLowerCase().includes(lowerCaseInput);

        return matchesName || matchesIATA || matchesCity || matchesCountry;
      });
    } else {
      this.filteredDepAirports = []; // Clear the suggestions if there's no input
    }
  }

  filterArrAirports(input: string) {
    if (!this.allAirports || this.allAirports.length === 0) {
      return; // Exit early if no airports are available
    }

    if (input) {
      const lowerCaseInput = input.toLowerCase();
      this.filteredArrAirports = this.allAirports.filter((airport) => {
        const matchesName =
          airport.name && airport.name.toLowerCase().includes(lowerCaseInput);
        const matchesIATA =
          airport.iata && airport.iata.toLowerCase().includes(lowerCaseInput);
        const matchesCity =
          airport.city && airport.city.toLowerCase().includes(lowerCaseInput);
        const matchesCountry =
          airport.country &&
          airport.country.toLowerCase().includes(lowerCaseInput);

        return matchesName || matchesIATA || matchesCity || matchesCountry;
      });
    } else {
      this.filteredArrAirports = []; // Clear the suggestions if there's no input
    }
  }

  selectAirport(airport: any, type: string) {
    if (type === 'departure') {
      this.dep_iata = airport.iata; // Store the IATA code
      this.dep_name = airport.name; // Store the name for display
    } else {
      this.arr_iata = airport.iata; // Store the IATA code
      this.arr_name = airport.name; // Store the name for display
    }
    this.filteredDepAirports = []; // Clear suggestions after selection
    this.filteredArrAirports = []; // Clear suggestions after selection
  }

  closeSuggestions() {
    this.filteredDepAirports = [];
    this.filteredArrAirports = [];
  }

  closeDatePicker() {
    // Logic to close the date picker if necessary
  }
}
