import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service'

@Component({
  selector: 'app-issuance-passport-list',
  templateUrl: './issuance-passport-list.component.html',
  styleUrl: './issuance-passport-list.component.css'
})
export class IssuancePassportListComponent implements OnInit {
  passportDetailsList: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  variables_user: any = null;
  type_user: string | null = null;

  constructor(private auth: AuthService, private authService: EmployeeService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getIssuancePassport();
    this.variables_user = this.auth.getRoleUser();
    this.type_user = this.variables_user.type_user

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

  async createPassport(passportId: string): Promise<void> {
    await this.router.navigate(['/passport-form'], { state: { passportId: passportId } });
  }

  async viewPassport(passportId: string): Promise<void> {
    await this.router.navigate(['/passport-view'], { state: { applicationId: passportId, code: "1" } });
  }

  async editPassport(passportId: string): Promise<void> {
    await this.router.navigate(['/passport-edit'], { state: { applicationId: passportId } });
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

  async first_approval_application(passportId: string): Promise<void> {

    this.authService.first_approval_application(passportId).subscribe(
      (data: any) => {

        this.getIssuancePassport();
        this.successMessage = "First approval application submitted successfully"
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

  async final_approval_application(passportId: string): Promise<void> {

    this.authService.final_approval_application(passportId).subscribe(
      (data: any) => {

        this.getIssuancePassport();
        this.successMessage = "Final approval application submitted successfully"
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


  async rejected_application(passportId: string): Promise<void> {

    this.authService.rejected_application(passportId).subscribe(
      (data: any) => {

        this.getIssuancePassport();
        this.successMessage = "Passport application rejected successfully.";
        window.scrollTo(0, 0);
        this.errorMessage = null
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
