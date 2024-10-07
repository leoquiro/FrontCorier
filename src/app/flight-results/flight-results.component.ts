import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainSearchService } from '../main-search/main-search.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-flight-results',
  standalone: true,
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css'],
  imports: [CommonModule],
})
export class FlightResultsComponent implements OnInit {
  flights: any[] = [];
  dep_iata: string = '';
  arr_iata: string = '';
  date: string = '';

  constructor(private route: ActivatedRoute, private mainSearchService: MainSearchService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dep_iata = params['dep_iata'];
      this.arr_iata = params['arr_iata'];
      this.date = params['date'];

      if (this.dep_iata && this.arr_iata && this.date) {
        this.mainSearchService.getFlights(this.dep_iata, this.arr_iata, this.date).subscribe(data => {
          this.flights = data; // Assuming data is an array of flights directly
        });
      }
    });
  }
}
