import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  constructor(private _httpclient: HttpClient) { }


  //connect frontend to backend
  usersApiUrl = this.apiUrl+'/api/users/user';
  UserLoginApiUrl = this.apiUrl+'/api/users/user/login';
  editUserApiUrl = this.apiUrl+'/api/users/user/edit';
  getSingleUserApiUrl = this.apiUrl+'/api/users/user/username';
  createNewUserApiUrl = this.apiUrl+'/api/users/user/createuser';
  createNewClientApiUrl = this.apiUrl+'/api/clients/client';
  getClientByIDApiUrl = this.apiUrl+'/api/clients/client';
  getClientUserByUsernameApiUrl = this.apiUrl+'/api/clients/clientuser';
  // get all products

  getAllUsers(){
    return this._httpclient.get(`${this.usersApiUrl}`);
  }
  getSingleUserByUsername(data: any){
    return this._httpclient.get(`${this.getSingleUserApiUrl}/`+data);
  }
  login(data: any){
    return this._httpclient.post(`${this.UserLoginApiUrl}`, data);
  }
  editUser(data: any){
    return this._httpclient.put(`${this.editUserApiUrl}`, data);
  }
  createNewUser(data: any){
    return this._httpclient.post(`${this.createNewUserApiUrl}`, data);
  }
  createNewClient(data: any){
    return this._httpclient.post(`${this.createNewClientApiUrl}`, data);
  }
  getClientByID(data: any){
    return this._httpclient.get(`${this.getClientByIDApiUrl}/`+data);
  }
  getClientUserByUsername(data: any){
    return this._httpclient.get(`${this.getClientUserByUsernameApiUrl}/`+data);
  }
}
