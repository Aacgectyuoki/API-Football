import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

type Standings = {
  get: string;
  parameters: {
    league: string;
    season: string;
  };
  errors: string[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: LeagueStandings[];
};

type LeagueStandings = {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: StandingEntry[][];
  };
};

type StandingEntry = {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  home: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  away: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  update: string;
};

@Injectable({
  providedIn: 'root',
})
export class StandingsService {
  private apiUrl = `https://${environment.rapidapiHost}/standings`;

  constructor(private http: HttpClient) {}

  getStandings(leagueId: number, season: number): Observable<Standings> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.rapidapiHost,
      'x-rapidapi-key': environment.rapidapiKey,
    });

    const params = new HttpParams()
      .set('league', leagueId.toString())
      .set('season', season.toString());

    return this.http.get<Standings>(this.apiUrl, { headers, params });
  }
}