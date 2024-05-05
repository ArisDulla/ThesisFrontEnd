import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  async continueWithGoogle(): Promise<void> {
    try {

      await this.authService.continueWithGoogle();

    } catch (error) {
      this.errorMessage = 'Oops! Something went wrong'
    }
  }
}
