import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPrivComponent } from './navigation-priv/navigation-priv.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';
import { authGuard } from '../auth.guard'

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['cityzen', 'employeeYP01', 'employeeYP02', 'employeeSEC'] }
  },

  {
    path: 'dashboard-employee',
    component: DashboardEmployeeComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['employeeYP01', 'employeeYP02', 'employeeSEC'] }
  },

];

@NgModule({
  declarations: [

    NavigationPrivComponent,
    DashboardComponent,
    DashboardEmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ], exports: [
    NavigationPrivComponent

  ]
})
export class PrivateComponentsModule { }
