import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  variables_user: any = null;
  type_user: string | null = null;

  ngOnInit(): void {
    this.variables_user = this.auth.getRoleUser();
    this.type_user = this.variables_user.type_user
  }

}
