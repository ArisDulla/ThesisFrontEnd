import { Component } from '@angular/core';
import { PassportViewService } from '../services/passport-view.service'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service'

@Component({
  selector: 'app-issuance-passport-list',
  templateUrl: './issuance-passport-list.component.html',
  styleUrl: './issuance-passport-list.component.css'
})
export class IssuancePassportListComponent {
  passportDetailsList: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private auth: AuthService, private authService: PassportViewService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getIssuancePassport();

    this.auth.$refreshTokenReceived.subscribe(() => {
      this.getIssuancePassport();
    });

    this.route.queryParams.subscribe((params) => {
      this.successMessage = params['successMessage'] || null;
    });
  }

  formatDate(dateString: string | null): string {
    return dateString ? this.datePipe.transform(dateString, 'medium') ?? '' : '';
  }

  async viewDetails(passportId: string, passportType: string): Promise<void> {
    await this.router.navigate(['/issuance-view-citizen-view'], { state: { passportId: passportId, application_type: passportType } });
  }

  async editDetails(passportId: string, passportType: string): Promise<void> {
    await this.router.navigate(['/issuance-view-edit'], { state: { passportId: passportId, application_type: passportType } });
  }

  async cancel_application(passportId: string): Promise<void> {

    this.authService.cancel_application(passportId).subscribe(
      (data: any) => {

        this.getIssuancePassport();
        this.successMessage = "Passport application cancelled successfully.";
        this.errorMessage = null
        window.scrollTo(0, 0);
      },
      (error: any) => {

        this.successMessage = null
        let errorMessage: string = '';
        //
        // Error of Fields
        //
        for (const field in error.error) {
          errorMessage += field + " " + error.error[field][0] + '\n';
        }

        this.errorMessage = errorMessage;
        window.scrollTo(0, 0);

      }
    );
  }

  getIssuancePassport() {
    this.authService.getIssuancePassport().subscribe((res: any) => {

      //console.log(res)
      this.passportDetailsList = res;
    },
      (error: any) => {

        // Error catch at interceptor

      });
  }

  getApplicationTypeDescription(applicationType: string): string {
    switch (applicationType) {
      case 'Issuance':
        return 'Eκδοση διαβατηρίου για Eνήλικες';
      case 'Renewal':
        return 'Ανανέωσης διαβατηρίου';
      case 'Replacement':
        return 'Αντικατάστασης διαβατηρίου';
      case 'TheftOrLoss':
        return 'Κλοπής ή απώλειας διαβατηρίου';
      case 'IssuanceMinors':
        return 'Έκδοσης διαβατηρίου για Aνήλικoυς';
      default:
        return '';
    }
  }
}
