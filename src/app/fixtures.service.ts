import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Fixture {
  fixture: {
    id: number;
    date: string;
    venue: {
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
    logo: string;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean;
    };
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
      home: number;
      away: number;
    };
    extratime: {
      home: number;
      away: number;
    };
    penalty: {
      home: number;
      away: number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class FixturesService {
  private fixturesUrl = 'https://v3.football.api-sports.io/fixtures';

  constructor(private http: HttpClient) { }

  getFixtures(teamId: number): Observable<Fixture[]> {
    const url = `${this.fixturesUrl}?team=${teamId}&last=10`;
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': 'a7d636044cd0089a178516baa2e132a6'
    });

    return this.http.get<Fixture[]>(url, { headers });
  }
  // getFixtures(teamId: number): Observable<Fixture[]> {
  //   const url = `https://v3.football.api-sports.io/fixtures?team=${teamId}&last=10`;
  //   const headers = new HttpHeaders({
  //     'x-rapidapi-host': 'v3.football.api-sports.io',
  //     'x-rapidapi-key': 'a7d636044cd0089a178516baa2e132a6'
  //   });
  
  //   return this.http.get<Fixture[]>(url, { headers });
  // }
  // getFixtures(teamId: number): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'x-rapidapi-host': 'v3.football.api-sports.io',
  //     'x-rapidapi-key': 'a7d636044cd0089a178516baa2e132a6'
  //   });

  //   const params = new HttpParams()
  //     .set('team', teamId.toString())
  //     .set('last', '10');

  //   return this.http.get<any>(this.fixturesUrl, { headers, params });
  // }
}
