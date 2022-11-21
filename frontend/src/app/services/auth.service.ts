// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    if(localStorage.getItem('token')!= null && (localStorage.getItem('level') === 'admin' || localStorage.getItem('level') === 'data')){
      return true;
    }
    return false;
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);// put token in this function
  }
  getToken(){
    return localStorage.getItem('token') || '';
  }
  haveAccessToBackOffice(){
    var logginToken = localStorage.getItem('token') || '';
    if(logginToken !== null && logginToken !== ''){
    var _atobdata = atob(logginToken.split('.')[1]);
    var _finaldata = JSON.parse(_atobdata);
    if(_finaldata.level === 'admin' || _finaldata.level === 'data' || _finaldata.level === 'sales'){
      return true;
    }
    else{
    return false;
    }
  }
  return false;
  }
  haveAccessToFrontOffice(){
    var logginToken = localStorage.getItem('token') || '';
    if(logginToken !== null && logginToken !== ''){
    var _atobdata = atob(logginToken.split('.')[1]);
    var _finaldata = JSON.parse(_atobdata);
    if(_finaldata.level !== 'admin' && _finaldata.level !== 'data' && _finaldata.level !== 'sales'){
      return true;
    }
    else{
    return false;
    }
  }
  return false;
  }
}