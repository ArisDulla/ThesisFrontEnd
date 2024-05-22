import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit {

  userData: any;
  errorMessage: string | null = null;
  errorMessagePassword: string | null = null;
  successMessagePassword: string | null = null;
  errorMessageDepartment: string | null = null;
  passwordData = {
    current_password: ''
  };
  loading: boolean = false;
  resp: any;
  department_name: any;
  departments: any[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getViewUser();

    this.authService.$refreshTokenReceived.subscribe(() => {

      this.getViewUser();

    });

  }

  getViewUser() {
    this.authService.getViewUser().subscribe((res: any) => {
      this.userData = res;
      this.errorMessage = "";
    },
      (error: any) => {

        if (error.error && error.error.detail) {
          this.errorMessage = error.error.detail;

        } else {
          this.errorMessage = 'Oops! Something went wrong '

        }
      });

    this.authService.getIdDepartmentOfUser().subscribe(
      (res: any) => {

        this.resp = res;
        //console.log(this.departmentId)

        if (this.resp.department_name === "NONE") {

          this.errorMessageDepartment = 'You are not assigned to any department. Please edit your profile.';
          this.department_name = "  -You are not assigned to any department.-  "

        } else {

          this.department_name = this.resp.department_name;

        }
      });
  }

  async delete(): Promise<void> {


    this.authService.delete(this.passwordData.current_password).subscribe((res: any) => {
      this.userData = res;
      this.errorMessage = "";

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      this.router.navigate(['/login'], { queryParams: { successMessage: "The account was successfully deleted." } }).then(() => {
        window.location.reload();
      });
    },
      (error: any) => {
        console.log(error.error)
        this.successMessagePassword = null;
        if (error.error) {
          let errorMessage: string = '';

          //
          // Error of Fields 
          //
          for (const field in error.error) {
            errorMessage += field + " " + error.error[field][0] + '\n';
          }

          this.errorMessagePassword = errorMessage;

        } else {

          this.errorMessagePassword = 'Oops! Something went wrong';

        }
      });
  }


}
