// src/app/main-search/main-search.component.ts
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainSearchService } from './main-search.service';

@Component({
  selector: 'app-main-search',
  standalone: true,
  templateUrl: './main-search.component.html', // Template file
  styleUrls: ['./main-search.component.css'], // Styles file
  imports: [FormsModule, CommonModule]
})


export class MainSearchComponent implements OnInit {
  dep_iata: string = ''; // Departure IATA code
  arr_iata: string = ''; // Arrival IATA code
  date: string = '';     // Flight date
  filteredAirports: any[] = []; // Array for filtered airport suggestions
  allAirports: any[] = []; // Array to hold all airport data

  constructor(private router: Router, private mainSearchService: MainSearchService) {}

  ngOnInit() {
    // Fetch the airport data from the JSON file
    this.mainSearchService.getAirports().subscribe(data => {
      this.allAirports = data; // Store the fetched airport data
    });
  }

  searchFlights() {
    this.router.navigate(['/results'], {
      queryParams: { dep_iata: this.dep_iata, arr_iata: this.arr_iata, date: this.date }
    });
  }

  // Method to filter airport suggestions based on user input
  filterAirports(input: string) {
    // Ensure allAirports is populated before filtering
    if (!this.allAirports || this.allAirports.length === 0) {
      return; // Exit early if no airports are available
    }

    if (input) {
      const lowerCaseInput = input.toLowerCase();
      this.filteredAirports = this.allAirports.filter(airport =>
        (airport.name && airport.name.toLowerCase().startsWith(lowerCaseInput)) || 
        (airport.code && airport.code.toLowerCase().startsWith(lowerCaseInput))
      );
    } else {
      this.filteredAirports = [];
    }
  }
}
// from = '';
//   to = '';
//   date = '';
//   fromAirports: any[] = [];
//   toAirports: any[] = [];
//   airports: any[] = []; // All airports from JSON
//   searchSubmitted = false;

//   constructor(private http: HttpClient) {
//     this.loadAirports();
//   }

//   // Load airport data from JSON file
//   loadAirports() {
//     this.http.get<any[]>('/airports_busiest_100.json').subscribe(data => {
//       this.airports = Object.values(data);
//     });
//   }

//   // Filter airports based on input
//   filterAirports(type: 'from' | 'to', query: string) {
//     const filtered = this.airports.filter(airport => 
//       airport.name.toLowerCase().includes(query.toLowerCase()) ||
//       airport.city.toLowerCase().includes(query.toLowerCase()) ||
//       airport.iata.toLowerCase().includes(query.toLowerCase())
//     );

//     if (type === 'from') {
//       this.fromAirports = filtered;
//     } else {
//       this.toAirports = filtered;
//     }
//   }

//   // Select an airport
//   selectAirport(type: 'from' | 'to', airport: any) {
//     if (type === 'from') {
//       this.from = `${airport.name} (${airport.iata})`;
//       this.fromAirports = [];
//     } else {
//       this.to = `${airport.name} (${airport.iata})`;
//       this.toAirports = [];
//     }
//   }

//   // Handle search submission
//   onSearch() {
//     this.searchSubmitted = true;
//     if (this.from && this.to && this.date) {
//       console.log('Searching for flights from', this.from, 'to', this.to, 'on', this.date);
//       // Implement your search logic here
//     }
//   }
//}