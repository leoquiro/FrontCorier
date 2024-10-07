import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Flight } from '../models/flight.model';   
import { Airport } from '../models/airport.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root' // Makes this service available throughout the app
})
export class MainSearchService {
  private apiUrl = environment.apiUrl; // Your Express API endpoint
  private airportDataUrl = 'airports_busiest_100.json'; // Path to your JSON file (use assets folder)

  constructor(private http: HttpClient) {}

  // Method to fetch flights based on departure and arrival airports and date
  getFlights(dep_iata: string, arr_iata: string, date: string): Observable<Flight[]> {
    const params = { dep_iata, arr_iata, date };
    return this.http.get<Flight[]>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching flights', error);
        return throwError(() => new Error('Failed to fetch flights'));
      })
    );
  }

  // Method to fetch airport data from JSON file
  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.airportDataUrl).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error fetching airport data', error);
        return throwError(() => new Error('Failed to fetch airport data'));
      })
    ); 
  }
}
