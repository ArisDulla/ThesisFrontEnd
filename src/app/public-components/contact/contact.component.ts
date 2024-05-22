import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor(private authService: AuthService) { }

  departments: any[] = [];
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.getAllDepartments();
  }
  //
  // Get All Departments
  //
  getAllDepartments() {

    this.authService.getAllDepartments().subscribe((res: any) => {
      this.departments = res;

    },
      (error: any) => {
        this.errorMessage = 'Oops! Something went wrong'

      });
  }
}
