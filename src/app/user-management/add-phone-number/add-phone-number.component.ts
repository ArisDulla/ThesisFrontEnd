import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrl: './add-phone-number.component.css'
})
export class AddPhoneNumberComponent implements OnInit {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  phoneNumber: string | null = null;
  firstErrorMessage: string | null = null;
  userId: string | null = null;
  cityzenId: string | null = null;
  type_user: string | null = null;
  variables_user: any = null;

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

    this.authService.addNewNumberOfUser(this.phoneNumber, this.userId).subscribe((res: any) => {

      this.successMessage = "Number created successfully";
      this.errorMessage = null;
      this.phoneNumber = null;
    },
      (error: any) => {

        let errorMessage: string = '';
        this.successMessage = null
        //
        // Error of Fields 
        //
        for (const field in error.error.phoneNumber) {
          errorMessage += field + " " + error.error.phoneNumber[field] + '\n';

        }

        this.errorMessage = errorMessage;

      });

  }
  async editCityzen(cityzenId: string): Promise<void> {
    await this.route.navigate(['/cityzen-edit'], { state: { cityzenId: cityzenId } });
  }
} 
