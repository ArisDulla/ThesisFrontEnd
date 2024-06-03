import { Component } from '@angular/core';
import { PassportViewService } from '../services/passport-view.service'
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service'

@Component({
  selector: 'app-passport-view',
  templateUrl: './passport-view.component.html',
  styleUrl: './passport-view.component.css'
})
export class PassportViewComponent {
  passportDetailsList: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(private auth: AuthService, private authService: PassportViewService, private router: Router) { }

  ngOnInit(): void {
    this.getPassport();

    this.auth.$refreshTokenReceived.subscribe(() => {
      this.getPassport();
    });

  }

  getPassport() {
    this.authService.getPassports().subscribe((res: any) => {

      this.passportDetailsList = res;
    },
      (error: any) => {

        // Error catch at interceptor

      });
  }
  async viewPassport(passportId: string): Promise<void> {
    await this.router.navigate(['/passport-view'], { state: { applicationId: passportId, code: "2" } });
  }
}
