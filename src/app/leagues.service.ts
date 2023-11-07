import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  private apiUrl = 'https://v3.football.api-sports.io/leagues';

  constructor(private http: HttpClient) {}

  getLeagueById(leagueId: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': 'a7d636044cd0089a178516baa2e132a6',
    });

    return this.http.get(`${this.apiUrl}?id=${leagueId}`, { headers });
  }
}
