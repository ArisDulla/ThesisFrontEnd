import { Component } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-navigation-priv',
  templateUrl: './navigation-priv.component.html',
  styleUrl: './navigation-priv.component.css'
})
export class NavigationPrivComponent {

  constructor(private authService: AuthService) { }

  errorMessage: string | null = null;

  async logout(): Promise<void> {
    try {

      await this.authService.logout()

    } catch (error: any) {
      if (error.error && error.error.detail) {
        this.errorMessage = error.error.detail;

      } else {
        this.errorMessage = 'Oops! Something went wrong'
      }
    }
  }
}
