import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private apiUrl = 'https://v3.football.api-sports.io/teams';

  constructor(private http: HttpClient) {}

  getTeamNameById(teamId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?id=${teamId}`);
  }
}