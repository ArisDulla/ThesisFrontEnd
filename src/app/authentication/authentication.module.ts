import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RedirectGoogleComponent } from './redirect-google/redirect-google.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, withInterceptors, provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { customInterceptor } from './interceptor/custom.interceptor'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'google', component: RedirectGoogleComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    RedirectGoogleComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withInterceptors([customInterceptor]))

  ],
})
export class AuthenticationModule { }
