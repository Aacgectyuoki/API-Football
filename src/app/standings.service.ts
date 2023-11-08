import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StandingsService {
  private apiUrl = `https://${environment.rapidapiHost}/standings`;

  constructor(private http: HttpClient) {}

  getStandings(leagueId: number, season: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.rapidapiHost,
      'x-rapidapi-key': environment.rapidapiKey,
    });

    const params = new HttpParams()
      .set('league', leagueId.toString())
      .set('season', season.toString());

    return this.http.get(this.apiUrl, { headers, params });
  }
}