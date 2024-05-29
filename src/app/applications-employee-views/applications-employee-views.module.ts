import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { authGuard } from '../auth.guard';
import { IssuancePassportListComponent } from './issuance-passport-list/issuance-passport-list.component';
import { IssuancePassportAllListComponent } from './issuance-passport-all-list/issuance-passport-all-list.component'

const routes: Routes = [
  {
    path: 'issuance-view-employee-view',
    component: IssuancePassportListComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['employeeYP01', 'employeeYP02'] }
  },
  {
    path: 'issuance-view-employee-all-view',
    component: IssuancePassportAllListComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['employeeYP01', 'employeeYP02', 'employeeSEC'] }
  },
];

@NgModule({
  declarations: [
    IssuancePassportListComponent,
    IssuancePassportAllListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],

})
export class ApplicationsEmployeeViewsModule { }
