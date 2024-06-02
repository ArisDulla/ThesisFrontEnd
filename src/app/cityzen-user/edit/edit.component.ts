import { Component, OnInit } from '@angular/core';
import { CityzenService } from '../services/cityzen.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  cityzenId: string | null = null;
  cityzen: any = {};
  phoneNumbers: any[] = [];
  successMessageNumber: string | null = null;
  errorMessageNumber: string | null = null;
  addresses: any[] = [];
  successMessageAddress: string | null = null;
  errorMessageAddress: string | null = null;

  constructor(private authService: CityzenService, private auth: AuthService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const navigation = window.history.state;
    this.cityzenId = navigation.cityzenId;

    this.getCityzen();

    this.auth.$refreshTokenReceived.subscribe(() => {
      this.getCityzen();
    });
  }

  getCityzen() {
    this.authService.getCityzen(this.cityzenId).subscribe((res: any) => {

      this.cityzen = res;
      this.authService.getNumbers(this.cityzen.user.id).subscribe((res: any) => {
        this.phoneNumbers = res
      });
      this.authService.getAddressesOfUser(this.cityzen.user.id).subscribe((res: any) => {

        //console.log(res)

        this.addresses = res;

      });
    },
      (error: any) => {

      });
  }

  async updatePassport() {
    this.authService.updateCityzen(this.cityzen).subscribe(
      (data: any) => {

        this.cityzen = data;

        this.errorMessage = null
        this.successMessage = "Passport updated successfully."
        window.scrollTo(0, 0);
      },
      (error: any) => {


        let errorMessage: string = '';
        this.successMessage = null
        //
        // Error of Fields of user data
        //
        for (const field in error.error.user) {
          errorMessage += field + " " + error.error.user[field] + '\n';

        }

        this.errorMessage = errorMessage;
        window.scrollTo(0, 0);
      }
    );
  }
  async saveNumber(id: any, number: any) {
    this.auth.updateNumberOfUser(id, number).subscribe((res: any) => {

      this.successMessageNumber = "Number updated successfully";
      this.errorMessageNumber = null;
      this.getCityzen();

    }, (error: any) => {

      let errorMessage: string = '';
      this.successMessageNumber = null
      //
      // Error of Fields 
      //
      for (const field in error.error) {
        errorMessage += field + " " + error.error[field][0] + '\n';

      }

      this.errorMessageNumber = errorMessage;

    });
  }

  submitForm(address: any) {
    this.auth.updateAddressOfUser(address.id, address).subscribe((res: any) => {

      this.successMessageAddress = "Address updated successfully";
      this.errorMessageAddress = null;
      this.getCityzen();
      window.scrollTo(0, 450);
    },
      (error: any) => {
        //console.log(error)
        let errorMessage: string = '';
        this.successMessageAddress = null
        //
        // Error of Fields 
        //
        for (const field in error.error.address) {
          errorMessage += field + " " + error.error.address[field] + '\n';

        }

        this.errorMessageAddress = errorMessage;

      });
  }

  async createAddress(userId: string): Promise<void> {

    await this.router.navigate(['/add-address'], { state: { userId: userId, cityzenId: this.cityzenId } });
  }

  async removeAddress(address_id: any): Promise<void> {
    this.auth.removeAddress(address_id).subscribe((res: any) => {

      this.getCityzen();
      this.errorMessageAddress = null

    },
      (error: any) => {
        this.successMessageAddress = null
        this.errorMessageAddress = 'Oops! Something went wrong '
      });
  }

}
