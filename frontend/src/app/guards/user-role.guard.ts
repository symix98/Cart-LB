import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login/login.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(public authSerivce: AuthService, public router: Router , private route: ActivatedRoute , private toastr: ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authSerivce.haveAccessToFrontOffice()){
    return true;
    }
    else{
    this.toastr.warning("Please login!");
    this.router.navigate(['/login'],{queryParams: {commitedURL:state.url}});
    return false;
  }
  }
  
}
