import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiUrl = environment.apiUrl;

  constructor(private _httpclient: HttpClient) { }

  getAllAddressesApiUrl = this.apiUrl+'/api/addresses/address';
  createAddressApiUrl = this.apiUrl+'/api/addresses/address/create';
  getAddressByClientidApiUrl = this.apiUrl+'/api/addresses/addressId';
  getAddressByIdApiUrl = this.apiUrl+'/api/addresses/address/id';
  
  getAllAddresses(data: any){
    return this._httpclient.get(`${this.getAllAddressesApiUrl}/`+data);
  }
  createAddress(data: any){
    return this._httpclient.post(`${this.createAddressApiUrl}`,data);
  }
  getAddressByClientID(data: any){
    return this._httpclient.get(`${this.getAddressByClientidApiUrl}/`+data);
  }
  getAddressById(data: any){
    return this._httpclient.get(`${this.getAddressByIdApiUrl}/`+data);
  }
}
