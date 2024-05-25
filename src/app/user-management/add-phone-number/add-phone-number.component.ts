import { Component } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrl: './add-phone-number.component.css'
})
export class AddPhoneNumberComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  phoneNumber: string | null = null;

  constructor(private authService: AuthService) { }


  async submitForm() {

    this.authService.addNewNumberOfUser(this.phoneNumber).subscribe((res: any) => {

      this.successMessage = "Number created successfully";
      this.errorMessage = null;

    },
      (error: any) => {

        let errorMessage: string = '';
        this.successMessage = null
        //
        // Error of Fields 
        //
        for (const field in error.error) {
          errorMessage += field + " " + error.error[field][0] + '\n';

        }

        this.errorMessage = errorMessage;

      });

  }
} 
