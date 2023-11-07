import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaguesService } from '../leagues.service';

type LeagueData = {
  get: string;
  parameters: {
    id: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: {
    league: {
      id: number;
      name: string;
      type: string;
      logo: string;
    };
    country: {
      name: string;
      code: string;
      flag: string;
    };
    seasons: {
      year: number;
      start: string;
      end: string;
      current: boolean;
      coverage: {
        fixtures: {
          events: boolean;
          lineups: boolean;
          statistics_fixtures: boolean;
          statistics_players: boolean;
        };
        standings: boolean;
        players: boolean;
        top_scorers: boolean;
        top_assists: boolean;
        top_cards: boolean;
        injuries: boolean;
        predictions: boolean;
        odds: boolean;
      };
    }[];
  }[];
};

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit {
  leagueId!: number;
  // leaguesData: any;
  leaguesData: LeagueData | null = null;

  constructor(
    private leaguesService: LeaguesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.leagueId = +params['id'];
      this.leaguesService.getLeagueById(this.leagueId).subscribe((data: LeagueData) => {
        this.leaguesData = data;
      });
      // this.leaguesService.getLeagueById(this.leagueId).subscribe((data) => {
      //   this.leaguesData = data;
      // });
    });
  }
}