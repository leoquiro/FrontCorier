import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MainSearchService } from './main-search.service';
import { OutsideClickDirective } from '../directives/outside-click.directive';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-main-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    CommonModule,
    OutsideClickDirective,
  ],
})
export class MainSearchComponent implements OnInit {
  dep_iata: string = ''; 
  arr_iata: string = ''; 
  dep_name: string = ''; 
  arr_name: string = ''; 
  date: string = ''; 
  filteredDepAirports: any[] = []; 
  filteredArrAirports: any[] = []; 
  allAirports: any[] = []; 

 
  depControl: FormControl = new FormControl(); 
  arrControl: FormControl = new FormControl();    

  constructor(
    private router: Router,
    private mainSearchService: MainSearchService
  ) {}

  ngOnInit() {
    this.fetchAirports(); // Fetch airports when the component initializes

    // Debounce and filter departure airport input
    this.depControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.filterDepAirports(value); 
    });

    // Debounce and filter arrival airport input
    this.arrControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.filterArrAirports(value);  
    });
  }

  // Fetch the airport data from the JSON file
  fetchAirports() {
    if (this.allAirports.length === 0) {
      this.mainSearchService.getAirports().subscribe((data) => {
        this.allAirports = data; 
      });
    }
  }

  // Route to the results page with query params for the flight search
  searchFlights() {
    this.router.navigate(['/results'], {
      queryParams: {
        dep_iata: this.dep_iata,
        arr_iata: this.arr_iata,
        date: this.date,
      },
    });
  }

  // Filter departure airports based on input
  filterDepAirports(input: string) {
    if (!input || input.trim() === '') {
        this.filteredDepAirports = []; // Clear suggestions if input is empty
        return; // Exit early if there's no input
    }

    const lowerCaseInput = input.toLowerCase();
    this.filteredDepAirports = this.allAirports.filter((airport) => {
        const name = airport.name || ''; 
        const iata = airport.iata || ''; 
        const city = airport.city || ''; 
        const country = airport.country || ''; 

        const matchesName = name.toLowerCase().includes(lowerCaseInput);
        const matchesIATA = iata.toLowerCase().includes(lowerCaseInput);

        return matchesName || matchesIATA;
    });
}


  // Filter arrival airports based on input
  filterArrAirports(input: string) {
    if (!input || input.trim() === '') {
        this.filteredArrAirports = []; // Clear suggestions if input is empty
        return; // Exit early if there's no input
    }

    const lowerCaseInput = input.toLowerCase();
    this.filteredArrAirports = this.allAirports.filter((airport) => {
        const name = airport.name || ''; 
        const iata = airport.iata || ''; 
        const city = airport.city || ''; 
        const country = airport.country || ''; 

        const matchesName = name.toLowerCase().includes(lowerCaseInput);
        const matchesIATA = iata.toLowerCase().includes(lowerCaseInput);
        const matchesCity = city.toLowerCase().includes(lowerCaseInput);
        const matchesCountry = country.toLowerCase().includes(lowerCaseInput);

        return matchesName || matchesIATA || matchesCity || matchesCountry;
    });
}





  // Select an airport from the suggestions
  selectAirport(airport: any, type: string) {
    if (type === 'departure') {
      this.dep_iata = airport.iata; // Store the IATA code
      this.dep_name = airport.name; // Store the name for display
      this.depControl.setValue(airport.name); // Set the name in the departure input
    } else {
      this.arr_iata = airport.iata; // Store the IATA code
      this.arr_name = airport.name; // Store the name for display
      this.arrControl.setValue(airport.name); // Set the name in the arrival input
    }
    
    this.filteredDepAirports = []; // Clear departure suggestions after selection
    this.filteredArrAirports = []; // Clear arrival suggestions after selection
  }
  

  closeSuggestions() {
    this.filteredDepAirports = [];
    this.filteredArrAirports = [];
  }

  closeDatePicker() {
  }
}
