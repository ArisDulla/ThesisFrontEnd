import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-edit-phone-number',
  templateUrl: './edit-phone-number.component.html',
  styleUrl: './edit-phone-number.component.css'
})
export class EditPhoneNumberComponent implements OnInit {

  phoneNumber_id: string | null = null;
  phoneNumber: any;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  firstErrorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const navigation = window.history.state;
    this.phoneNumber_id = navigation.phoneNumber_id;

    if (this.phoneNumber_id) {
      this.getNumberOfUser();

      this.authService.$refreshTokenReceived.subscribe(() => {

        this.getNumberOfUser();

      });
    } else {
      this.firstErrorMessage = "Oops! Something went wrong.";

    }
  }
  async submitForm() {

    this.authService.updateNumberOfUser(this.phoneNumber_id, this.phoneNumber).subscribe((res: any) => {

      this.successMessage = "Number updated successfully";
      this.errorMessage = null;

    },
      (error: any) => {

        let errorMessage: string = '';
        this.successMessage = null
        //
        // Error of Fields 
        //
        for (const field in error.error.phoneNumber) {
          errorMessage += field + " " + error.error.phoneNumber[field] + '\n';

        }

        this.errorMessage = errorMessage;

      });


  }

  getNumberOfUser() {
    this.authService.getNumberOfUser(this.phoneNumber_id).subscribe((res: any) => {

      this.phoneNumber = res;
    },
      (error: any) => {
        // Error catch at interceptor
      });

  }


}
