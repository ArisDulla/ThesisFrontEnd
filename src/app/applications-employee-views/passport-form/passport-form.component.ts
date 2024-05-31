import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service'
import { AuthService } from '../../authentication/services/auth.service'

@Component({
  selector: 'app-passport-form',
  templateUrl: './passport-form.component.html',
  styleUrl: './passport-form.component.css'
})
export class PassportFormComponent implements OnInit {
  passportForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  successMessage: string | null = null;
  passportId: string | null = null;
  variables_user: any = null;
  type_user: string | null = null;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private authService: EmployeeService) { }

  ngOnInit(): void {
    this.variables_user = this.auth.getRoleUser();
    this.type_user = this.variables_user.type_user

    const navigation = window.history.state;
    this.passportId = navigation.passportId;

    this.passportForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      place_of_birth: ['', Validators.required],
      nationality: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_expiry: ['', Validators.required],
      passport_application: ['']

    });
  }
  async save_passport(): Promise<void> {

    if (this.passportId != null && this.passportId != undefined) {

      try {
        this.passportForm.value.passport_application = this.passportId;

        await this.authService.save_passport(this.passportForm.value);
        this.successMessage = "Passport created successfully."
        this.passportForm.reset();
        this.errorMessage = null
        window.scrollTo(0, 0);

      } catch (error: any) {

        let errorMessage2: string = '';
        this.successMessage = null
        //
        // Error of Fields of user data
        //
        for (const field in error.error) {
          errorMessage2 += field + " " + error.error[field][0] + '\n';
        }

        this.errorMessage = errorMessage2;
        window.scrollTo(0, 0);
      }
    } else {

      this.errorMessage = "Oops! Something went wrong.";

    }

  }



}
