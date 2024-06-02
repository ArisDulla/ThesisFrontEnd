import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewListComponent } from './view-list/view-list.component';
import { authGuard } from '../auth.guard'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'cityzen-view-list',
    component: ViewListComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['employeeYP01', 'employeeYP02', "employeeSEC", "admin"]
    }
  },
  {
    path: 'cityzen-edit',
    component: EditComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['employeeYP01', 'employeeYP02', "employeeSEC", "admin"]
    }
  }
];

@NgModule({
  declarations: [
    ViewListComponent,
    EditComponent
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
export class CityzenUserModule { }
