import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuardService } from './guards/auth.guard';
import { RoleGuardService } from './guards/role-guard-service.guard';
import { UserRoleGuard } from './guards/user-role.guard';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login/login.component';
import { ManagementComponent } from './management/management/management.component';
import { RegisterComponent } from './register/register/register/register.component';
// import { 
//   AuthGuardService as AuthGuard 
// } from './guards/auth.guard';
// import { 
//   RoleGuardService as RoleGuard 
// } from './guards/role-guard-service.guard'

const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: '', component: HeaderComponent},
   { path: 'roguemin', component: ManagementComponent, canActivate:[RoleGuardService] },
   { path: 'register', component: RegisterComponent},
  //  { 
  //   path: 'admin', 
  //   component: AdminComponent, 
  //   canActivate: [RoleGuard], 
  //   data: { 
  //     expectedRole: 'admin'
  //   } 
  // },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
