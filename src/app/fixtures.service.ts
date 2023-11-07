import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FixturesService {
  private apiUrl = 'https://v3.football.api-sports.io/fixtures'; // Use the correct API endpoint

  constructor(private http: HttpClient) {}

  getFixturesForTeam(teamId: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': 'a7d636044cd0089a178516baa2e132a6', // Replace with your API key
    });

    const params = new HttpParams()
      .set('team', teamId.toString())
      .set('timezone', 'UTC'); // Include any required parameters
      
    return this.http.get(this.apiUrl, { headers, params });
  }
}
// export class FixturesService {
//   private apiUrl = 'https://v3.football.api-sports.io/fixtures';

//   constructor(private http: HttpClient) {}

//   getFixturesForTeam(teamName: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'x-rapidapi-host': 'v3.football.api-sports.io',
//       'x-rapidapi-key': 'a7d636044cd0089a178516baa2e132a6', // Replace with your API key
//     });

//     const params = new HttpParams()
//       .set('team', teamName) // Use the team name
//       .set('timezone', 'UTC');

//     return this.http.get(this.apiUrl, { headers, params });
//   }
// }