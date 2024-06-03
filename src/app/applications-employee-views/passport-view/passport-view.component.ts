import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service'
import { AuthService } from '../../authentication/services/auth.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-passport-view',
  templateUrl: './passport-view.component.html',
  styleUrl: './passport-view.component.css'
})
export class PassportViewComponent implements OnInit {
  passportForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  successMessage: string | null = null;
  applicationId: string | null = null;
  passportDetails: any;
  variables_user: any = null;
  type_user: string | null = null;
  flag: boolean = false;
  code: string | null = null;

  constructor(private datePipe: DatePipe, private auth: AuthService, private formBuilder: FormBuilder, private authService: EmployeeService) { }


  ngOnInit(): void {
    this.variables_user = this.auth.getRoleUser();
    this.type_user = this.variables_user.type_user

    const navigation = window.history.state;
    this.applicationId = navigation.applicationId;
    this.code = navigation.code;

    this.getPassport();

    this.auth.$refreshTokenReceived.subscribe(() => {
      this.getPassport();
    });


  }
  getPassport() {
    this.authService.getPassport(this.applicationId, this.code).subscribe((res: any) => {

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
