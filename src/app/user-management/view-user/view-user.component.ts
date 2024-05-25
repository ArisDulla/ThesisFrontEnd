import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit {

  userData: any;
  errorMessage: string | null = null;
  errorMessage2: string | null = null;
  errorMessage3: string | null = null;
  errorMessagePassword: string | null = null;
  successMessagePassword: string | null = null;
  errorMessageDepartment: string | null = null;
  passwordData = {
    current_password: ''
  };
  loading: boolean = false;
  resp: any;
  department_name: any;
  departments: any[] = [];
  phoneNumbers: any[] = [];
  addresses: any[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getViewUser();

    this.authService.$refreshTokenReceived.subscribe(() => {

      this.getViewUser();

    });

  }

  getViewUser() {
    this.authService.getViewUser().subscribe((res: any) => {
      this.userData = res;
      this.errorMessage = "";
      //
      // GET NUMBERS OF USER
      //
      this.authService.getNumbersOfUser().subscribe((res: any) => {

        //console.log(res)

        this.phoneNumbers = res;

      },
        (error: any) => {
          // Error catch at interceptor
        });
      //
      // GET ADDRESSES OF USER
      //
      this.authService.getAddressesOfUser().subscribe((res: any) => {

        //console.log(res)

        this.addresses = res;

      },
        (error: any) => {
          // Error catch at interceptor
        });
    },
      (error: any) => {
        // Error catch at interceptor
      });

    this.authService.getIdDepartmentOfUser().subscribe(
      (res: any) => {

        this.resp = res;
        //console.log(this.departmentId)

        if (this.resp.department_name === "NONE") {

          this.errorMessageDepartment = 'You are not assigned to any department. Please edit your profile.';
          this.department_name = "  -You are not assigned to any department.-  "

        } else {

          this.department_name = this.resp.department_name;

        }
      });

  }

  async delete(): Promise<void> {


    this.authService.delete(this.passwordData.current_password).subscribe((res: any) => {
      this.userData = res;
      this.errorMessage = "";

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      this.router.navigate(['/login'], { queryParams: { successMessage: "The account was successfully deleted." } }).then(() => {
        window.location.reload();
      });
    },
      (error: any) => {
        console.log(error.error)
        this.successMessagePassword = null;
        if (error.error) {
          let errorMessage: string = '';

          //
          // Error of Fields 
          //
          for (const field in error.error) {
            errorMessage += field + " " + error.error[field][0] + '\n';
          }

          this.errorMessagePassword = errorMessage;

        } else {

          this.errorMessagePassword = 'Oops! Something went wrong';

        }
      });
  }

  async editNumber(phoneNumber_id: any): Promise<void> {
    this.router.navigate(['/edit-phone-number'], { state: { phoneNumber_id: phoneNumber_id } });
  }

  async removeNumberOfUser(phoneNumber_id: any): Promise<void> {
    this.authService.removeNumberOfUser(phoneNumber_id).subscribe((res: any) => {

      window.location.reload();
      this.errorMessage2 = null
    },
      (error: any) => {
        this.errorMessage2 = 'Oops! Something went wrong '
      });
  }

  async editAddress(address_id: any): Promise<void> {
    this.router.navigate(['/edit-address'], { state: { address_id: address_id } });
  }
  
  async removeAddress(address_id: any): Promise<void> {
    this.authService.removeAddress(address_id).subscribe((res: any) => {

      window.location.reload();
      this.errorMessage3 = null
    },
      (error: any) => {
        this.errorMessage3 = 'Oops! Something went wrong '
      });
  }

}
