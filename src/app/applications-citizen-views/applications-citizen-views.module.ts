import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IssuancePassportListComponent } from './issuance-passport-list/issuance-passport-list.component';
import { DatePipe } from '@angular/common';
import { IssuancePassportViewComponent } from './issuance-passport-view/issuance-passport-view.component';
import { IssuancePassportEditComponent } from './issuance-passport-edit/issuance-passport-edit.component';

const routes: Routes = [
  { path: 'issuance-view-citizen-view', component: IssuancePassportViewComponent },
  { path: 'issuance-view-citizen-list', component: IssuancePassportListComponent },
  { path: 'issuance-view-edit', component: IssuancePassportEditComponent },

];

@NgModule({
  declarations: [
    IssuancePassportListComponent,
    IssuancePassportViewComponent,
    IssuancePassportEditComponent
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
