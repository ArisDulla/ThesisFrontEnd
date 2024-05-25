import { Component } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-edit-phone-number',
  templateUrl: './edit-phone-number.component.html',
  styleUrl: './edit-phone-number.component.css'
})
export class EditPhoneNumberComponent {

  phoneNumber_id: string | null = null;
  phoneNumber: any;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const navigation = window.history.state;
    this.phoneNumber_id = navigation.phoneNumber_id;

    this.getNumberOfUser();

    this.authService.$refreshTokenReceived.subscribe(() => {

      this.getNumberOfUser();

    });
  }
  async submitForm() {

    this.authService.updateNumberOfUser(this.phoneNumber_id, this.phoneNumber.number).subscribe((res: any) => {

      this.successMessage = "Number updated successfully";
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

  getNumberOfUser() {
    this.authService.getNumberOfUser(this.phoneNumber_id).subscribe((res: any) => {

      this.phoneNumber = res;
    },
      (error: any) => {
        // Error catch at interceptor
      });

  }


}
