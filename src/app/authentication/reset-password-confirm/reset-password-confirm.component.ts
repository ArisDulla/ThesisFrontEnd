import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.css']
})
export class ResetPasswordConfirmComponent implements OnInit {
  resetForm: FormGroup = new FormGroup({});
  token: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  uid: string | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.uid = this.route.snapshot.paramMap.get('uid');

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {

    this.loading = true;
    if (this.resetForm.invalid) {
      this.errorMessage = "Please fill out the form correctly.";
      this.loading = false;
      this.successMessage = null;

      return;
    }

    this.authService.confirmResetPassword(this.token, this.uid, this.resetForm.value.newPassword).subscribe(

      (data: any) => {
        this.loading = false;

        this.successMessage = "Your password has been reset successfully.";
        this.errorMessage = null;

      },

      (error: any) => {
        this.loading = false;

        this.successMessage = null;
        if (error.error.new_password)
          this.errorMessage = error.error.new_password;
        else
          this.errorMessage = 'Oops! Something went wrong';

      }
    );
  }
}
