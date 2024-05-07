import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;


  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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

