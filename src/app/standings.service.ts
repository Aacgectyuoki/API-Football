import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StandingsService {
  private apiUrl = 'https://v3.football.api-sports.io/standings';

  constructor(private http: HttpClient) {}

  getStandings(leagueId: number, season: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': 'a7d636044cd0089a178516baa2e132a6',
    });

    const params = new HttpParams()
      .set('league', leagueId.toString())
      .set('season', season.toString());

    return this.http.get(this.apiUrl, { headers, params });
  }
}