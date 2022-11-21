import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  apiUrl = environment.apiUrl;

  constructor(private _httpclient: HttpClient) { }
  
  getCartItemsApiUrl = this.apiUrl+'/api/orderlines/orderline';
  getAllOrdersApiUrl = this.apiUrl+'/api/orders/order';
  getOrderLineByIDApiUrl = this.apiUrl+'/api/orderlines/orderline/expand';
  getCompletedOrdersApiUrl = this.apiUrl+'/api/orders/order/completed';
  getInCompletedOrdersApiUrl = this.apiUrl+'/api/orders/order/incompleted';
  updateProductsQuantityApiUrl = this.apiUrl+'/api/orderlines/orderline/update';
  createOrderApiUrl = this.apiUrl+'/api/orders/order';
  completeOrderApiUrl = this.apiUrl+'/api/orders/order/update';
  updateOrderAddressByUsernameApiUrl = this.apiUrl+'/api/orders/order/update/address';
  deleteOrderAndOrderlines = this.apiUrl+'/api/orders/order/delete';

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": "*",
    
  } ),responseType: 'text' as 'json'
};
  addToCart(data: any){
    return this._httpclient.post(`${this.createOrderApiUrl}`,data,this.httpOptions);
  }
  getCart(username: any){
    return this._httpclient.get(`${this.getCartItemsApiUrl}/`+username);
  }
  updateProductsQuantity(username: string , key: string , id: any){
    return this._httpclient.put(`${this.updateProductsQuantityApiUrl}/`+id,{username , key});
  }
  getAllOrders(){
    return this._httpclient.get(`${this.getAllOrdersApiUrl}`);
  }
  getOrderLineByID(data: any){
    return this._httpclient.get(`${this.getOrderLineByIDApiUrl}/`+data);
  }
  getCompletedOrders(){
    return this._httpclient.get(`${this.getCompletedOrdersApiUrl}`);
  }
  getInCompletedOrders(){
    return this._httpclient.get(`${this.getInCompletedOrdersApiUrl}`);
  }
  updateOrderStatus(username: any , status: any){
    return this._httpclient.put(`${this.completeOrderApiUrl}`,{username , status});
  }
  updateOrderAddressByUsername(username: any , addressid: any){
    return this._httpclient.put(`${this.updateOrderAddressByUsernameApiUrl}/`+addressid,{username});
  }
  deleteOrder(){
    return this._httpclient.delete(`${this.deleteOrderAndOrderlines}`);
  }
}
