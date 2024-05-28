import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  userData: any = {};

  passwordData = {
    new_password: '',
    current_password: ''
  };

  selectedDepartment: any;
  departments: any[] = [];
  res: any;
  cityzen_id: any;

  //
  // Messages
  //
  errorMessageDepartment: string | null = null;
  successMessageDepartment: string | null = null;
  errorMessagePassword: string | null = null;
  successMessagePassword: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  //
  // Loading
  //
  loading: boolean = false;
  loadingDataUser: boolean = false;
  type_user: any;

  variables_user: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.getViewUser();

    this.authService.$refreshTokenReceived.subscribe(() => {

      this.getViewUser();

    });


  }
  //
  //
  // Get Data of user
  //
  //
  getViewUser() {
    this.authService.getViewUser().subscribe((res: any) => {

      this.userData = res;

      //
      // GET variables of user
      //
      this.variables_user = this.authService.getRoleUser();

      if (this.variables_user.department_id === null) {

        this.errorMessageDepartment = 'You are not assigned to any department. Please select one from the options below';
        this.cityzen_id = this.variables_user.user_id
        this.type_user = this.variables_user.type_user

      } else {

        this.selectedDepartment = this.variables_user.department_id;
        this.cityzen_id = this.variables_user.user_id
        this.type_user = this.variables_user.type_user

      }
      this.getAllDepartments();

    },
      (error: any) => {
        // Error catch at interceptor
      });
  }

  //
  //
  // Update Data Of User
  //
  // 
  updateUser() {
    this.loadingDataUser = true;

    this.authService.updateUser(this.userData).subscribe(
      (data: any) => {

        this.loadingDataUser = false;

        this.userData = data;

        this.errorMessage = null
        this.successMessage = "User data updated successfully."

      },
      (error: any) => {

        this.loadingDataUser = false;

        let errorMessage: string = '';
        this.successMessage = null
        //
        // Error of Fields of user data
        //
        for (const field in error.error) {
          errorMessage += field + " " + error.error[field][0] + '\n';

        }

        this.errorMessage = errorMessage;

      }
    );
  }
  //
  //
  // Update Password
  //
  //
  updatePassword() {

    this.loading = true;

    this.authService.updatePassword(this.passwordData).subscribe(
      (data: any) => {

        this.loading = false;

        this.errorMessagePassword = null
        this.successMessagePassword = "Password updated successfully."

        this.passwordData.new_password = '';
        this.passwordData.current_password = '';
      },
      (error: any) => {

        this.loading = false;

        let errorMessage: string = '';
        this.successMessagePassword = null
        //
        // Error of Fields 
        //
        for (const field in error.error) {
          errorMessage += field + " " + error.error[field][0] + '\n';

        }

        this.errorMessagePassword = errorMessage;
      }
    );
  }
  //
  // Get All Departments FOR DROP DOWN LIST INPUT
  //
  getAllDepartments() {

    this.authService.getAllDepartments().subscribe((res: any) => {
      this.departments = res;

    },
      (error: any) => {

        // Error catch at interceptor

      });
  }


  //
  //
  // Update Id Department Of User
  //
  // 
  updateIdDepartmentOfUser() {

    this.authService.updateIdDepartmentOfUser(this.selectedDepartment, this.cityzen_id).subscribe(
      (data: any) => {
        this.authService.refreshToken()
        this.errorMessageDepartment = null
        this.successMessageDepartment = "Department updated successfully."

      },
      (error: any) => {

        this.successMessageDepartment = null
        this.errorMessageDepartment = 'Oops! Something went wrong';

      }
    );
  }
}