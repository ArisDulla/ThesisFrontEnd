import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    this.loading = true;

    // Access the email value from the form
    const email = this.loginForm.value.email;

    if (this.loginForm.invalid) {
      this.errorMessage = "Please enter a valid email address.";
      this.loading = false;
      this.successMessage = null;

      return;
    }

    this.authService.resetPassword(email).subscribe(

      (data: any) => {

        this.loading = false;
        this.successMessage = "Password reset email has been successfully sent to your email address.";
        this.errorMessage = null;

      },

      (error: any) => {

        this.loading = false;
        this.successMessage = null;
        this.errorMessage = 'Oops! Something went wrong';

      }
    );
  }
}
