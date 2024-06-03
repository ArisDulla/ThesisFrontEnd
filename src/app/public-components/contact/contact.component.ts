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
  nextPage: string | null = null;
  previousPage: string | null = null;

  ngOnInit(): void {
    this.getAllDepartments();
  }
  //
  // Get All Departments
  //
  getAllDepartments(url?: string) {
    this.authService.getAllDepartments(url).subscribe((res: any) => {
      this.departments = res.results;
      this.nextPage = res.next;
      this.previousPage = res.previous;
    },
      (error: any) => {
        this.errorMessage = 'Oops! Something went wrong';
      });
  }

  onNextPage() {
    if (this.nextPage) {
      this.getAllDepartments(this.nextPage);
    }
  }

  onPreviousPage() {
    if (this.previousPage) {
      this.getAllDepartments(this.previousPage);
    }
  }

}
