import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.css'
})
export class EditAddressComponent implements OnInit {

  address_id: string | null = null;
  userData: any = {};
  errorMessage: string | null = null;
  successMessage: string | null = null;
  firstErrorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const navigation = window.history.state;
    this.address_id = navigation.address_id;
    if (this.address_id) {
      this.getaddressOfUser();

      this.authService.$refreshTokenReceived.subscribe(() => {

        this.getaddressOfUser();

      });
    } else {
      this.firstErrorMessage = "Oops! Something went wrong.";
    }
  }
  async submitForm() {

    this.authService.updateAddressOfUser(this.address_id, this.userData).subscribe((res: any) => {

      this.successMessage = "Address updated successfully";
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

  getaddressOfUser() {
    this.authService.getAddressOfUser(this.address_id).subscribe((res: any) => {
      
      this.userData = res;
    },
      (error: any) => {
        // Error catch at interceptor
      });
  }
}
