import { Component, OnInit } from '@angular/core';
import { PassportViewService } from '../services/passport-view.service'
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service'

@Component({
  selector: 'app-issuance-passport-edit',
  templateUrl: './issuance-passport-edit.component.html',
  styleUrl: './issuance-passport-edit.component.css'
})
export class IssuancePassportEditComponent implements OnInit {
  passportId: string | null = null;
  passportDetails: any;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  errorMessageEdit: string | null = null;
  successMessageEdit: string | null = null;
  application_type: string | null = null;

  id_card_copy: File | null = null;
  applicant_photo: File | null = null;
  payment_receipt: File | null = null;
  caregiver_address_certification: File | null = null;
  convicted_declaration: File | null = null;
  minor_age_declaration: File | null = null;
  application_form: File | null = null;
  old_passport_pdf: File | null = null;
  police_report: File | null = null;

  variables_user: any = null;
  type_user: string | null = null;
  dashboard: string | null = null;

  constructor(private auth: AuthService, private router: Router, private authService: PassportViewService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    const navigation = window.history.state;
    this.passportId = navigation.passportId;
    this.application_type = navigation.application_type;
    this.dashboard = navigation.dashboard;

    this.variables_user = this.auth.getRoleUser();
    this.type_user = this.variables_user.type_user
    //
    // Retrive view of issuance passpor
    //
    if (this.passportId == null || this.passportId === undefined) {

      this.errorMessage = "Oops! Something went wrong.";

    } else {
      this.errorMessage = null;

      this.getIssuancePassport();
      this.authService.$refreshTokenReceived.subscribe(() => {
        this.getIssuancePassport();
      });

    }
  }

  downloadFile(docType: string, passportId: number, application_type: string): void {

    this.authService.getIssuancePassportFile(docType, passportId, application_type).subscribe(
      response => {

        this.downLoadFile22(response, "application/ms-excel");
      },
      error => {

        this.errorMessage = 'Oops! Something went wrong';

      }
    );
  }
  downLoadFile22(data: any, type: string) {

    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  formatDate(dateString: string | null): string {
    return dateString ? this.datePipe.transform(dateString, 'medium') ?? '' : '';
  }

  getIssuancePassport() {
    this.authService.getIssuancePassportView(this.passportId, this.application_type).subscribe((res: any) => {

      this.passportDetails = res;

    },
      (error: any) => {
        // Error catch at interceptor
      });
  }


  //
  // SAVE 
  //

  onFileChange(event: Event, fileIndex: number): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (fileIndex === 1) {
        this.id_card_copy = file;


      } else if (fileIndex === 2) {
        this.applicant_photo = file;


      } else if (fileIndex === 3) {
        this.payment_receipt = file;


      } else if (fileIndex === 4) {
        this.application_form = file;
      }

      else if (fileIndex === 5) {
        this.old_passport_pdf = file;
      }

      else if (fileIndex === 6) {
        this.police_report = file;
      }


      else if (fileIndex === 7) {
        this.caregiver_address_certification = file;
      }


      else if (fileIndex === 8) {
        this.convicted_declaration = file;
      }

      else if (fileIndex === 9) {
        this.minor_age_declaration = file;
      }

    }

  }

  onSubmit(): void {
    const formData = new FormData();
    let flag = 0;
    if (this.minor_age_declaration) {
      formData.append('minor_age_declaration', this.minor_age_declaration);
      flag = 1;
    }

    if (this.convicted_declaration) {
      formData.append('convicted_declaration', this.convicted_declaration);
      flag = 1;
    }

    if (this.caregiver_address_certification) {
      formData.append('caregiver_address_certification', this.caregiver_address_certification);
      flag = 1;
    }

    if (this.police_report) {
      formData.append('police_report', this.police_report);
      flag = 1;
    }

    if (this.old_passport_pdf) {
      formData.append('old_passport_pdf', this.old_passport_pdf);
      flag = 1;
    }

    if (this.application_form) {
      formData.append('application_form', this.application_form);
      flag = 1;
    }

    if (this.id_card_copy) {
      formData.append('id_card_copy', this.id_card_copy);
      flag = 1;
    }

    if (this.applicant_photo) {
      formData.append('applicant_photo', this.applicant_photo);
      flag = 1;
    }

    if (this.payment_receipt) {
      formData.append('payment_receipt', this.payment_receipt);
      flag = 1;
    }


    if (flag == 1) {
      this.authService.issuancePassport(formData, this.application_type, this.passportId).subscribe(

        (data: any) => {

          const inputs = document.querySelectorAll<HTMLInputElement>('input[type=file]');
          inputs.forEach((input: HTMLInputElement) => {
            input.value = '';
          });
          this.successMessageEdit = "Successfully updated the application!";
          this.errorMessageEdit = null;

        },

        (error: any) => {

          this.successMessageEdit = null;

          let errorMessage: string = '';
          //
          // Error of Fields
          //
          for (const field in error.error) {
            errorMessage += field + " " + error.error[field][0] + '\n';

          }

          this.errorMessageEdit = errorMessage;

        }
      );
    } else {
      this.errorMessageEdit = "Must complete at least 1 field."

    }
  }
}


