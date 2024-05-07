import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from './view-user/view-user.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: 'view-user', component: ViewUserComponent },
];

@NgModule({
  declarations: [
    ViewUserComponent,

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
