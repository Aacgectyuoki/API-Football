import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './leagues/leagues.component';
import { StandingsComponent } from './standings/standings.component';
import { FixturesComponent } from './fixtures/fixtures.component';

const routes: Routes = [
  // default route
  { path: '', redirectTo: `/standings/39/${new Date().getFullYear()}`, pathMatch: 'full' },

  { path: 'leagues/:id', component: LeaguesComponent },

  // route to the standings of a particular league in the most recent season
  { path: 'standings/:leagueId/:season', component: StandingsComponent},

  // route to the last 10 games of the team that was clicked/touched
  { path: 'fixtures/:teamId', component: FixturesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
