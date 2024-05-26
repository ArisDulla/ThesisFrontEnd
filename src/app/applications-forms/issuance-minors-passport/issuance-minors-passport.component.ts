import { Component } from '@angular/core';
import { PassportService } from '../services/passport.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-issuance-minors-passport',
  templateUrl: './issuance-minors-passport.component.html',
  styleUrl: './issuance-minors-passport.component.css'
})
export class IssuanceMinorsPassportComponent {
  id_card_copy: File | null = null;
  applicant_photo: File | null = null;
  payment_receipt: File | null = null;
  caregiver_address_certification: File | null = null;
  convicted_declaration: File | null = null;
  minor_age_declaration: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private passportService: PassportService, private router: Router
  ) { }


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
        this.caregiver_address_certification = file;
      } else if (fileIndex === 5) {
        this.convicted_declaration = file;
      } else if (fileIndex === 6) {
        this.minor_age_declaration = file;
      }
    }

  }

  onSubmit(): void {

    if (this.id_card_copy && this.applicant_photo && this.payment_receipt && this.caregiver_address_certification && this.convicted_declaration && this.minor_age_declaration) {
      const formData = new FormData();
      formData.append('id_card_copy', this.id_card_copy);
      formData.append('applicant_photo', this.applicant_photo);
      formData.append('payment_receipt', this.payment_receipt);
      formData.append('caregiver_address_certification', this.caregiver_address_certification);
      formData.append('convicted_declaration', this.convicted_declaration);
      formData.append('minor_age_declaration', this.minor_age_declaration);


      this.passportService.issuanceMinorsPassport(formData).subscribe(

        (data: any) => {

          this.errorMessage = null;
          this.router.navigate(['/issuance-view-citizen-list'], { queryParams: { successMessage: "Successfully submitted the application!" } })
          console.log(data)

        },

        (error: any) => {

          let errorMessage: string = '';
          //
          // Error of Fields
          //
          for (const field in error.error) {
            errorMessage += field + " " + error.error[field][0] + '\n';

          }

          this.errorMessage = errorMessage;

        }
      );
    } else {
      this.errorMessage = "Must complete all fields."
    }
  }

}
