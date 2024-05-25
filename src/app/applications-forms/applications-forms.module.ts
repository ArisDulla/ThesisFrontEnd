import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IssuancePassportComponent } from './issuance-passport/issuance-passport.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RenewalPassportComponent } from './renewal-passport/renewal-passport.component';
import { ReplacementPassportComponent } from './replacement-passport/replacement-passport.component';

const routes: Routes = [
  { path: 'issuance-passport', component: IssuancePassportComponent },
  { path: 'renewal-passport', component: RenewalPassportComponent },
  { path: 'replacement-passport', component: ReplacementPassportComponent },

];

@NgModule({
  declarations: [
    IssuancePassportComponent,
    RenewalPassportComponent,
    ReplacementPassportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})


export class ApplicationsFormsModule { }
