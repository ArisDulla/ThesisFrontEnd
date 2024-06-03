import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service'
import { AuthService } from '../../authentication/services/auth.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-passport-edit',
  templateUrl: './passport-edit.component.html',
  styleUrl: './passport-edit.component.css'
})
export class PassportEditComponent implements OnInit {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  applicationId: string | null = null;
  passportDetails: any = {};
  variables_user: any = null;
  type_user: string | null = null;
  flag: boolean = false;

  constructor(private datePipe: DatePipe, private auth: AuthService, private formBuilder: FormBuilder, private authService: EmployeeService) { }


  ngOnInit(): void {
    this.variables_user = this.auth.getRoleUser();
    this.type_user = this.variables_user.type_user

    const navigation = window.history.state;
    this.applicationId = navigation.applicationId;
    this.getPassport();

    this.auth.$refreshTokenReceived.subscribe(() => {
      this.getPassport();
    });


  }
  updatePassport() {

    this.authService.updatePassport(this.passportDetails).subscribe(
      (data: any) => {

        this.passportDetails = data;

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
        for (const field in error.error) {
          errorMessage += field + " " + error.error[field][0] + '\n';

        }

        this.errorMessage = errorMessage;
        window.scrollTo(0, 0);
      }
    );
  }
  getPassport() {
    this.authService.getPassport(this.applicationId, "1").subscribe((res: any) => {

      //console.log(res)
      this.passportDetails = res;
      this.errorMessage = null;
      this.flag = true;
    },
      (error: any) => {
        this.flag = false;

        this.errorMessage = "This application does not match any passport"

      });
  }

  formatDate(dateString: string | null): string {
    return dateString ? this.datePipe.transform(dateString, 'medium') ?? '' : '';
  }

}

