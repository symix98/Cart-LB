import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ManagementModule } from './management/management.module';
import { AuthGuardService } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { RoleGuardService } from './guards/role-guard-service.guard';
import { RegisterModule } from './register/register/register.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    LoginModule,
    RegisterModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ManagementModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [RoleGuardService, AuthGuardService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
