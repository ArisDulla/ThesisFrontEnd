import { Component } from '@angular/core';
import { PassportService } from '../services/passport.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-theft-or-loss-passport',
  templateUrl: './theft-or-loss-passport.component.html',
  styleUrl: './theft-or-loss-passport.component.css'
})
export class TheftOrLossPassportComponent {
  id_card_copy: File | null = null;
  applicant_photo: File | null = null;
  payment_receipt: File | null = null;
  police_report: File | null = null;
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
        this.police_report = file;
      }
    }

  }

  onSubmit(): void {

    if (this.id_card_copy && this.applicant_photo && this.payment_receipt && this.police_report) {
      const formData = new FormData();
      formData.append('id_card_copy', this.id_card_copy);
      formData.append('applicant_photo', this.applicant_photo);
      formData.append('payment_receipt', this.payment_receipt);
      formData.append('police_report', this.police_report);


      this.passportService.theftOrLossPassport(formData).subscribe(

        (data: any) => {

          this.errorMessage = null;
          this.router.navigate(['/issuance-view-citizen-list'], { queryParams: { successMessage: "Successfully submitted the application!" } })

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
