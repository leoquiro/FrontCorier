// src/app/main-search/main-search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes this service available throughout the app
})
export class MainSearchService {
  private apiUrl = 'http://localhost:3000/api/flights'; // Your Express API endpoint
  private airportDataUrl = '/airports_busiest_100.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  // Method to fetch flights based on departure and arrival airports and date
  getFlights(dep_iata: string, arr_iata: string, date: string): Observable<any> {
    const params = { dep_iata, arr_iata, date }; // Create an object with query parameters
    return this.http.get(this.apiUrl, { params });
  }

  // Method to fetch airport data from JSON file
  getAirports(): Observable<any[]> {
    return this.http.get<any[]>(this.airportDataUrl); // Return an observable of the airport data
  }
}
