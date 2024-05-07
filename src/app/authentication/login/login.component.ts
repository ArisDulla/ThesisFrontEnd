import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    //
    // Error Message
    // 
    this.route.queryParams.subscribe((params) => {
      this.errorMessage = params['errorMessage'] || null;
    });
    if (this.errorMessage) {
      setTimeout(() => {
        this.errorMessage = null;
      }, 10000);
    }

    //
    // Success Message
    // 
    this.route.queryParams.subscribe((params) => {
      this.successMessage = params['successMessage'] || null;
    });
    if (this.successMessage) {
      setTimeout(() => {
        this.successMessage = null;
      }, 10000);
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

  //
  // Login (email & password)
  //
  async login(): Promise<void> {
    try {
      if (this.loginForm.valid) {
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;
        await this.authService.login(username, password);

      } else {
        // Mark all fields as touched to display error messages
        this.loginForm.markAllAsTouched();
      }
    } catch (error: any) {
      if (error.error && error.error.detail) {
        this.errorMessage = error.error.detail;

      } else {
        this.errorMessage = 'Oops! Something went wrong '

      }
    }
  }
}
