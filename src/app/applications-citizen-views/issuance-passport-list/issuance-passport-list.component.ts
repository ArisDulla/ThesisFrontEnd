import { Component } from '@angular/core';
import { PassportViewService } from '../services/passport-view.service'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-issuance-passport-list',
  templateUrl: './issuance-passport-list.component.html',
  styleUrl: './issuance-passport-list.component.css'
})
export class IssuancePassportListComponent {
  passportDetailsList: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: PassportViewService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getIssuancePassport();

    this.authService.$refreshTokenReceived.subscribe(() => {
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

  async cancel_application(passportId: string): Promise<void> {

    this.authService.cancel_application(passportId).subscribe(
      (data: any) => {

        window.location.reload();
        this.successMessage = "null"
        this.errorMessage = null
      },
      (error: any) => {

        this.successMessage = null
        this.errorMessage = 'Oops! Something went wrong';

      }
    );
  }

  getIssuancePassport() {
    this.authService.getIssuancePassport().subscribe((res: any) => {
      console.log(res)
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
