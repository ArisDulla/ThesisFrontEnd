import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passport-all',
  templateUrl: './passport-all.component.html',
  styleUrl: './passport-all.component.css'
})
export class PassportAllComponent implements OnInit {
  passportList: any[] = [];

  constructor(private authService: EmployeeService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.getAllPassport();

    this.authService.$refreshTokenReceived.subscribe(() => {
      this.getAllPassport();
    });

  }

  getAllPassport() {
    this.authService.getAllPassport().subscribe((res: any) => {

      this.passportList = res;
    },
      (error: any) => {

        // Error catch at interceptor

      });
  }
  async viewPassport(passportId: string): Promise<void> {
    await this.router.navigate(['/passport-view'], { state: { applicationId: passportId, code: "22" } });
  }

}
