import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { authGuard } from '../auth.guard';
import { IssuancePassportListComponent } from './issuance-passport-list/issuance-passport-list.component';
import { IssuancePassportAllListComponent } from './issuance-passport-all-list/issuance-passport-all-list.component';
import { PassportFormComponent } from './passport-form/passport-form.component';
import { PassportViewComponent } from './passport-view/passport-view.component';
import { PassportEditComponent } from './passport-edit/passport-edit.component';
import { PassportAllComponent } from './passport-all/passport-all.component'

const routes: Routes = [
  {
    path: 'issuance-view-employee-view',
    component: IssuancePassportListComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['employeeYP01', 'employeeYP02', 'employeeSEC'] }
  },
  {
    path: 'issuance-view-employee-all-view',
    component: IssuancePassportAllListComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['employeeYP01', 'employeeYP02', 'employeeSEC'] }
  },
  {
    path: 'passport-form',
    component: PassportFormComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['employeeYP02'] }
  },
  {
    path: 'passport-view',
    component: PassportViewComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['employeeYP02', 'employeeYP01', "cityzen"] }
  },
  {
    path: 'passport-edit',
    component: PassportEditComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['employeeYP02'] }
  },
  {
    path: 'passport-all',
    component: PassportAllComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['employeeYP01', 'employeeYP02']
    }
  },

];

@NgModule({
  declarations: [
    IssuancePassportListComponent,
    IssuancePassportAllListComponent,
    PassportFormComponent,
    PassportViewComponent,
    PassportEditComponent,
    PassportAllComponent
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
