import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixturesService } from '../fixtures.service';

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

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit {
  fixtures: Fixture[] = [];
  teamId: number = 0;
  selectedTeamName: string = '';

  constructor(
    private fixturesService: FixturesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamId = +params['teamId'];

      this.fixturesService.getFixtures(this.teamId).subscribe((data: FixtureData) => { // Use FixtureData here
        this.fixtures = data.response; // Assuming the fixtures are in the 'response' property
        this.selectedTeamName = this.getSelectedTeamName(data, this.teamId);
      });
    });
  }

  /* view the team fixtures. 
  the options would be either "away" or "home" because a team can either be away or home */
  viewTeamFixtures(fixture: Fixture): void {
    const teamId = fixture.teams.home.id === this.teamId ? fixture.teams.home.id : fixture.teams.away.id;
    const homeOrAway = fixture.teams.home.id === this.teamId ? 'home' : 'away';
    this.router.navigate(['/fixtures', teamId, homeOrAway]);
  }

  getSelectedTeamName(data: FixtureData, teamId: number): string {
    const fixture = data.response.find((f) =>
      f.teams.home.id === teamId || f.teams.away.id === teamId
    );
  
    if (fixture) {
      return fixture.teams.home.id === teamId
        ? fixture.teams.home.name
        : fixture.teams.away.name;
    }
  
    return '';
  }

  // go back to standings page
  goBack(previousLeagueId: number | null): void {
    if (previousLeagueId !== null && (previousLeagueId == 39 || previousLeagueId == 140
      || previousLeagueId == 61 || previousLeagueId == 79 || previousLeagueId == 135)) {
      const currentYear = new Date().getFullYear();
      this.router.navigate(['/standings', previousLeagueId, currentYear]);
    } else {
      /* Handle the case where there's no previous league ID, 
      e.g., navigate to /standings/39/{currentYear} - Premier League (England) */
      const currentYear = new Date().getFullYear();
      this.router.navigate(['/standings', 39, currentYear]);
    }
  }
}  