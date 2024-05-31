import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IssuancePassportListComponent } from './issuance-passport-list/issuance-passport-list.component';
import { DatePipe } from '@angular/common';
import { IssuancePassportViewComponent } from './issuance-passport-view/issuance-passport-view.component';
import { IssuancePassportEditComponent } from './issuance-passport-edit/issuance-passport-edit.component';
import { authGuard } from '../auth.guard';
import { PassportViewComponent } from './passport-view/passport-view.component'

const routes: Routes = [
  {
    path: 'issuance-view-citizen-view',
    component: IssuancePassportViewComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['cityzen', 'employeeYP01', 'employeeYP02', 'employeeSEC'] }
  },

  {
    path: 'issuance-view-citizen-list',
    component: IssuancePassportListComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['cityzen'] }
  },

  {
    path: 'issuance-view-edit',
    component: IssuancePassportEditComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['cityzen', 'employeeYP01', 'employeeYP02', 'employeeSEC'] }
  },
  {
    path: 'passports-view',
    component: PassportViewComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['cityzen'] }
  }

];

@NgModule({
  declarations: [
    IssuancePassportListComponent,
    IssuancePassportViewComponent,
    IssuancePassportEditComponent,
    PassportViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
})
export class ApplicationsCitizenViewsModule { }
