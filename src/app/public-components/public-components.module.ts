import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },

];

@NgModule({
  declarations: [
    NavigationComponent,
    HomeComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ], exports: [
    NavigationComponent
  ]
})
export class PublicComponentsModule { }
