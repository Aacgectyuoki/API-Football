import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StandingsService } from '../standings.service';


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

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit {
  standingsData!: Standings;

  constructor(
    private standingsService: StandingsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const leagueId = +params['leagueId'];
      const season = +params['season'];

      this.standingsService.getStandings(leagueId, season).subscribe((data: Standings) => {
        this.standingsData = data;
      });
    });
  }

  viewTeamFixtures(teamId: number) {
    this.router.navigate(['fixtures', teamId]);
  }
}
