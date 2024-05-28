import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-navigation-priv',
  templateUrl: './navigation-priv.component.html',
  styleUrl: './navigation-priv.component.css'
})
export class NavigationPrivComponent implements OnInit {

  constructor(private authService: AuthService) { }

  errorMessage: string | null = null;
  variables_user: any = null;
  type_user: string | null = null;

  ngOnInit(): void {

    this.variables_user = this.authService.getRoleUser();
    if (this.variables_user.type_user) {
      this.type_user = this.variables_user.type_user
    }

  }
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
