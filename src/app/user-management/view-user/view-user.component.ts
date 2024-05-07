import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit {

  userData: any;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getViewUser();

    this.authService.$refreshTokenReceived.subscribe(() => {

      this.getViewUser();

    });

  }

  getViewUser() {
    this.authService.getViewUser().subscribe((res: any) => {
      this.userData = res;
      this.errorMessage = "";
    },
      (error: any) => {

        if (error.error && error.error.detail) {
          this.errorMessage = error.error.detail;

        } else {
          this.errorMessage = 'Oops! Something went wrong '

        }
      });
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
