import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixturesService } from '../fixtures.service';

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

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit {
  fixtures: Fixture[] = [];
  teamId: number = 0;

  constructor(
    private fixturesService: FixturesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamId = +params['teamId'];

      this.fixturesService.getFixtures(this.teamId).subscribe((data: Fixture[]) => {
        this.fixtures = data;
      });
    });
  }

  viewTeamFixtures(fixture: Fixture): void {
    const teamId = fixture.teams.home.id === this.teamId ? fixture.teams.home.id : fixture.teams.away.id;
    const homeOrAway = fixture.teams.home.id === this.teamId ? 'home' : 'away';
    this.router.navigate(['/fixtures', teamId, homeOrAway]);
  }

  goBack(): void {
    this.router.navigate(['/standings']);
  }
}