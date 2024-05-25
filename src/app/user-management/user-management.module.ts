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


const routes: Routes = [
  { path: 'view-user', component: ViewUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'edit-phone-number', component: EditPhoneNumberComponent },
  { path: 'add-phone-number', component: AddPhoneNumberComponent },

];

@NgModule({
  declarations: [
    ViewUserComponent,
    EditUserComponent,
    EditPhoneNumberComponent,
    AddPhoneNumberComponent,

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
