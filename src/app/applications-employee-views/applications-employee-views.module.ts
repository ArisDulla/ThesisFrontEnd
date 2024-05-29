import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { authGuard } from '../auth.guard';
import { IssuancePassportListComponent } from './issuance-passport-list/issuance-passport-list.component'

const routes: Routes = [
  {
    path: 'issuance-view-employee-view',
    component: IssuancePassportListComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['employeeYP01', 'employeeYP02'] }
  },
];

@NgModule({
  declarations: [
    IssuancePassportListComponent
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
