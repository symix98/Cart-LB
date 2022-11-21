// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public authSerivce: AuthService, public router: Router) {}
  canActivate(): boolean {
    if(this.authSerivce.haveAccessToBackOffice()){
    return true;
    }
    this.router.navigate(['']);
    return false;
  }
}