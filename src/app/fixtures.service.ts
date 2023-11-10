import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


interface FixtureData {
  get: string;
  parameters: {
    live: string;
  };
  errors: Error[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Fixture[];
}

interface Error {
  code: number;
  message: string;
}

interface Fixture {
  fixture: {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: number;
      second: number | null;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: number;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number;
    away: number;
  };
  score: {
    halftime: {
      home: number;
      away: number;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
}

interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FixturesService {
  private fixturesUrl = `https://${environment.rapidapiHost}/fixtures`;

  constructor(private http: HttpClient) { }

  getFixtures(teamId: number): Observable<FixtureData> {
    const url = `${this.fixturesUrl}?team=${teamId}&last=10`;
    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.rapidapiHost,
      'x-rapidapi-key': environment.rapidapiKey
    });

    return this.http.get<FixtureData>(url, { headers });
  }
}
