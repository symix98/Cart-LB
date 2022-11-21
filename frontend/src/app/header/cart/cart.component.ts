import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  response: any;
  productsCartItems: any;
  products: any;
  totalPrice: any = 0;
  productsWithQuantities: any = [];
  emptyCart!: boolean;
  constructor(private cartService: CartService , private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.totalPrice = 0;
    this.cartService.getCart(localStorage.getItem('username')).subscribe({next:(res)=>{
      if(res){
     this.response = res;
     if(this.response.message !== "no data"){
     this.productsCartItems = this.response.data;
     this.products = this.response.data.products;
     this.productsCartItems.cartItems.map((item: any)=>{
      this.totalPrice += item.olprice * item.olqtty;
     });
    }
    else{
      this.emptyCart = true;
    }
    }},error: (e) => {
        },complete: () => {
        },
      });
      
  }
  updateQuantity(key: string , id: any, index: any){
    if(key === 'sub'){
      this.productsCartItems.cartItems[index].olqtty = this.productsCartItems.cartItems[index].olqtty - 1;
      if(this.productsCartItems.cartItems[index].olqtty === 0){
      this.products = this.products.filter((product: any)=>product.pid !== id);
    }
      const username = localStorage.getItem('username');
      if(username){
      this.cartService.updateProductsQuantity(username , key , id).subscribe({next:(res)=>{
        this.ngOnInit();
    },error: (e) => {
        },complete: () => {
        },
      });
    }
    } else{
      this.productsCartItems.cartItems[index].olqtty = this.productsCartItems.cartItems[index].olqtty + 1;
      const username = localStorage.getItem('username');
      if(username){
      this.cartService.updateProductsQuantity(username , key , id).subscribe({next:(res)=>{
    },error: (e) => {
        },complete: () => {
        },
      });
    }
    }
    this.totalPrice = 0;
    this.productsCartItems.cartItems.map((item: any)=>{
      this.totalPrice += item.olprice * item.olqtty;
     });
  }

}
