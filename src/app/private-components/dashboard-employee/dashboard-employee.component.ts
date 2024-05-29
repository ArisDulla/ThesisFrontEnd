import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service'

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrl: './dashboard-employee.component.css'
})
export class DashboardEmployeeComponent implements OnInit {

  variables_user: any = null;
  type_user: string | null = null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.variables_user = this.auth.getRoleUser();
    this.type_user = this.variables_user.type_user
  }

}
