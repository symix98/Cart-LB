import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ProductsservicesService {

  apiUrl = environment.apiUrl;

  constructor(private _httpclient: HttpClient) { }

  //connect frontend to backend
  getProductsapiUrl = this.apiUrl+'/api/products/product';
  createProductApiUrl = this.apiUrl+'/api/products/product/create';
  updateProductApiUrl = this.apiUrl+'/api/products/product/update';
  searchProductApiUrl = this.apiUrl+'/api/products/product/search';
  // get all products

  getAllProducts(){
    return this._httpclient.get(`${this.getProductsapiUrl}`);
  }
  getProductById(id: any){
    return this._httpclient.get(`${this.getProductsapiUrl}/`+ id);
  }
  createNewProduct(data: any){
    return this._httpclient.post(`${this.createProductApiUrl}`,data);
  }
  updateProductById(productUpdate: any,id: any){
    return this._httpclient.put(`${this.updateProductApiUrl}/`+ id,productUpdate);
  }
  searchProduct(data: string){
    return this._httpclient.post(`${this.searchProductApiUrl}`,{search:data});
  }
}
