import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPrivComponent } from './navigation-priv/navigation-priv.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  declarations: [

    NavigationPrivComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ], exports: [
    NavigationPrivComponent

  ]
})
export class PrivateComponentsModule { }
