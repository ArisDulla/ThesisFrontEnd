import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from './view-user/view-user.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditPhoneNumberComponent } from './edit-phone-number/edit-phone-number.component';
import { AddPhoneNumberComponent } from './add-phone-number/add-phone-number.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { authGuard } from '../auth.guard'


const routes: Routes = [
  {
    path: 'view-user',
    component: ViewUserComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['cityzen', 'employeeYP01', 'employeeYP02', "employeeSEC", "admin"]
    }

  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['cityzen', 'employeeYP01', 'employeeYP02', "employeeSEC", "admin"]
    }
  },
  {
    path: 'edit-phone-number',
    component: EditPhoneNumberComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['cityzen', 'employeeYP01', 'employeeYP02', "employeeSEC", "admin"]
    }
  },
  {
    path: 'add-phone-number',
    component: AddPhoneNumberComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['cityzen', 'employeeYP01', 'employeeYP02', "employeeSEC", "admin"]
    }
  },
  {
    path: 'add-address',
    component: AddAddressComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['cityzen', 'employeeYP01', 'employeeYP02', "employeeSEC", "admin"]
    }
  },
  {
    path: 'edit-address',
    component: EditAddressComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['cityzen', 'employeeYP01', 'employeeYP02', "employeeSEC", "admin"]
    }
  },

];

@NgModule({
  declarations: [
    ViewUserComponent,
    EditUserComponent,
    EditPhoneNumberComponent,
    AddPhoneNumberComponent,
    AddAddressComponent,
    EditAddressComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ]
})
export class UserManagementModule { }
