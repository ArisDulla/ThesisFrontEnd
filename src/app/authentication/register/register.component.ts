import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  async register(): Promise<void> {
    this.loading = true;


    try {

      await this.authService.register(this.registerForm.value);
      this.loading = false;
      this.errorMessage = null;
      this.successMessage = "User account created successfully. Please check your email to complete your account activation"

    } catch (error: any) {

      this.loading = false;
      let errorMessage2: string = '';
      this.successMessage = null
      //
      // Error of Fields of user data
      //
      for (const field in error.error) {
        errorMessage2 += field + " " + error.error[field][0] + '\n';
      }

      this.errorMessage = errorMessage2;
    }
  }

  //
  // Continue with Google
  // 
  async continueWithGoogle(): Promise<void> {
    try {

      await this.authService.continueWithGoogle();

    } catch (error: any) {
      if (error.error && error.error.detail) {
        this.errorMessage = error.error.detail;

      } else {
        this.errorMessage = 'Oops! Something went wrong'
      }
    }
  }

}
