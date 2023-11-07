import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './leagues/leagues.component';
import { StandingsComponent } from './standings/standings.component';
import { FixturesComponent } from './fixtures/fixtures.component';

const routes: Routes = [
  { path: '', redirectTo: `/standings/39/${new Date().getFullYear()}`, pathMatch: 'full' }, // Default route
  { path: 'leagues/:id', component: LeaguesComponent },
  { path: 'standings/:leagueId/:season', component: StandingsComponent},
  // { path: 'fixtures', component: FixturesComponent },
  { path: 'fixtures/:teamId', component: FixturesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
