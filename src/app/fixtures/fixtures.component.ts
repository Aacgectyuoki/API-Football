import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixturesService } from '../fixtures.service';

type Fixture = {
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
      home: number | null;
      away: number | null;
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
};

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit {
  // teamId!: number;
  // teamName!: string;
  // fixtures: Fixture[] = [];

  // constructor(
  //   private route: ActivatedRoute,
  //   private fixturesService: FixturesService
  // ) {}

  teamId!: number;
fixtures: Fixture[] = []; // Define Fixture type

constructor(
  private route: ActivatedRoute,
  private fixturesService: FixturesService
) {}

ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.teamId = +params['teamId'];

    this.fixturesService.getFixturesForTeam(this.teamId).subscribe(
      (data) => {
        if (data && data.response) {
          this.fixtures = data.response;
        } else {
          console.error('Error fetching fixtures for the team.');
        }
      },
      (error) => {
        console.error('HTTP request error:', error);
      }
    );
  });
}}
  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.teamId = +params['teamId'];

  //     this.fixturesService.getFixturesForTeam(this.teamId).subscribe(
  //       (data) => {
  //         if (data && data.response) {
  //           this.fixtures = data.response;
  //           this.displayLast10MatchesForTeam();
  //         } else {
  //           console.error('Error fetching fixtures for the team.');
  //         }
  //       },
  //       (error) => {
  //         console.error('HTTP request error:', error);
  //       }
  //     );
  //   });
  // }

//   displayLast10MatchesForTeam(): void {
//     const today = new Date();
//     this.fixtures = this.fixtures
//       .filter(
//         (fixture) =>
//           (fixture.teams.home.id === this.teamId ||
//             fixture.teams.away.id === this.teamId) &&
//           new Date(fixture.fixture.date) <= today
//       )
//       .slice(-10);
//   }
// }
// export class FixturesComponent implements OnInit {
//   teamId!: number;
//   teamName!: string;
//   fixtures: Fixture[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private fixturesService: FixturesService
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.teamId = +params['teamId'];
//       this.teamName = params['teamName'];

//       this.fixturesService.getFixturesForTeam(this.teamId).subscribe(
//         (data) => {
//           if (data && data.response) {
//             this.fixtures = data.response;
//             this.displayLast10MatchesForTeam();
//           } else {
//             console.error('Error fetching fixtures for the team.');
//           }
//         },
//         (error) => {
//           console.error('HTTP request error:', error);
//         }
//       );
//     });
//   }

//   displayLast10MatchesForTeam(): void {
//     const today = new Date();
//     this.fixtures = this.fixtures
//       .filter(
//         (fixture) =>
//           (fixture.teams.home.id === this.teamId ||
//             fixture.teams.away.id === this.teamId) &&
//           new Date(fixture.fixture.date) <= today
//       )
//       .slice(-10);
//   }
// }