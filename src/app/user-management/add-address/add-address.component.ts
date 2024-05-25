import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent implements OnInit {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  userData: any = {};
  firstErrorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe((res: any) => { }
      , (error: any) => {
        this.firstErrorMessage = 'Oops! Something went wrong'
      });
  }

  async submitForm() {

    this.authService.addNewAddress(this.userData).subscribe((res: any) => {

      this.successMessage = "Address created successfully";
      this.errorMessage = null;

    },
      (error: any) => {

        let errorMessage: string = '';
        this.successMessage = null
        //
        // Error of Fields 
        //
        for (const field in error.error) {
          errorMessage += field + " " + error.error[field][0] + '\n';
        }

        this.errorMessage = errorMessage;

      });
  }
} 
