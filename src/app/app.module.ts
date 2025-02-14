import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementModule } from './user-management/user-management.module';
import { PublicComponentsModule } from './public-components/public-components.module'
import { PrivateComponentsModule } from './private-components/private-components.module'
import { ApplicationsFormsModule } from './applications-forms/applications-forms.module'
import { ApplicationsCitizenViewsModule } from './applications-citizen-views/applications-citizen-views.module'
import { ApplicationsEmployeeViewsModule } from './applications-employee-views/applications-employee-views.module'
import { CityzenUserModule } from './cityzen-user/cityzen-user.module'

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    UserManagementModule,
    PublicComponentsModule,
    PrivateComponentsModule,
    ApplicationsFormsModule,
    ApplicationsCitizenViewsModule,
    ApplicationsEmployeeViewsModule,
    CityzenUserModule

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
