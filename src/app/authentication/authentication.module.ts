import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RedirectGoogleComponent } from './redirect-google/redirect-google.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, withInterceptors, provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { customInterceptor } from './interceptor/custom.interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';
import { RegisterComponent } from './register/register.component';
import { ActivationConfirmComponent } from './activation-confirm/activation-confirm.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'google', component: RedirectGoogleComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-confirm/:uid/:token', component: ResetPasswordConfirmComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activation/:uid/:token', component: ActivationConfirmComponent },

];

@NgModule({
  declarations: [
    LoginComponent,
    RedirectGoogleComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    RegisterComponent,
    ActivationConfirmComponent,

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
