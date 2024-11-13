import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  // Getter to check if the user is authenticated
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated || false; // Ensure fallback to false
  }

  // Method to navigate to login page
  login() {
    this.authService.navigateToLogin();
  }
}
