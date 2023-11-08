import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  private apiUrl = `https://${environment.rapidapiHost}/leagues`;

  constructor(private http: HttpClient) {}

  getLeagueById(leagueId: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.rapidapiHost,
      'x-rapidapi-key': environment.rapidapiKey,
    });

    return this.http.get(`${this.apiUrl}?id=${leagueId}`, { headers });
  }
}
