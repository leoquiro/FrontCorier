// src/app/flight-results/flight-results.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainSearchService } from '../main-search/main-search.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-flight-results',
  standalone: true,
  templateUrl: './flight-results.component.html', // Template file
  styleUrls: ['./flight-results.component.css'], // Styles file
  imports: [CommonModule], // Add CommonModule here
})
export class FlightResultsComponent implements OnInit {
  flights: any[] = []; // Array to hold flight data
  dep_iata: string = ''; // Departure IATA code
  arr_iata: string = ''; // Arrival IATA code
  date: string = '';     // Flight date

  constructor(private route: ActivatedRoute, private mainSearchService: MainSearchService) {}

  ngOnInit(): void {
    // Retrieve query params from URL
    this.route.queryParams.subscribe(params => {
      this.dep_iata = params['dep_iata'];
      this.arr_iata = params['arr_iata'];
      this.date = params['date'];

      // Fetch flight data based on query parameters
      if (this.dep_iata && this.arr_iata && this.date) {
        this.mainSearchService.getFlights(this.dep_iata, this.arr_iata, this.date).subscribe(data => {
          this.flights = data.data; // Adjust based on the response structure
        });
      }
    });
  }
}
