import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StandingsComponent } from './standings/standings.component';
import { FixturesComponent } from './fixtures/fixtures.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaguesComponent,
    NavbarComponent,
    StandingsComponent,
    FixturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // This line is correctly added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
