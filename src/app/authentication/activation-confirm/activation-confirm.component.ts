import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-activation-confirm',
  templateUrl: './activation-confirm.component.html',
  styleUrl: './activation-confirm.component.css'
})
export class ActivationConfirmComponent implements OnInit {

  token: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  uid: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.uid = this.route.snapshot.paramMap.get('uid');

    this.activationConfirm()

  }

  async activationConfirm() {

    this.authService.activationConfirm(this.token, this.uid).subscribe(

      (data: any) => {

        this.successMessage = "Your account has been successfully created and activated!";
        this.errorMessage = null;

      },
      (error: any) => {

        this.successMessage = null;
        this.errorMessage = 'Oops! Something went wrong';

      }
    );
  }
}
