import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';
import { Router } from '@angular/router';

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
  userId: string | null = null;
  variables_user: any = null;
  type_user: string | null = null;
  cityzenId: string | null = null;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    const navigation = window.history.state;
    this.userId = navigation.userId;
    this.cityzenId = navigation.cityzenId;

    this.variables_user = this.authService.getRoleUser();
    this.type_user = this.variables_user.type_user


    this.authService.verifyToken().subscribe((res: any) => { }
      , (error: any) => {
        this.firstErrorMessage = 'Oops! Something went wrong'
      });
  }

  async submitForm() {

    this.authService.addNewAddress(this.userData, this.userId).subscribe((res: any) => {

      this.successMessage = "Address created successfully";
      this.errorMessage = null;
      this.userData = {};
    },
      (error: any) => {

        let errorMessage: string = '';
        this.successMessage = null
        //
        // Error of Fields 
        //
        for (const field in error.error.address) {
          errorMessage += field + " " + error.error.address[field] + '\n';

        }

        this.errorMessage = errorMessage;

      });
  }

  async editCityzen(cityzenId: string): Promise<void> {
    await this.route.navigate(['/cityzen-edit'], { state: { cityzenId: cityzenId } });
  }
} 
