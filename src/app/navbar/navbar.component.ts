import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  goToLeague(leagueId: number) {
    this.router.navigate(['/leagues', leagueId]);
  }

  navigateTo(route: string) {
    this.router.navigate([route]); // Use the router to navigate to the specified route
  }
}
