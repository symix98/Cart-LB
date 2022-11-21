import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsservicesService } from 'src/app/services/productsservices.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

 category:any;
  products: any;
  page = 1;
  count = 0;
  tableSize = 27;
  tableSizes = [3, 6, 9, 12];
  productSearch!: string;
  allProductsNoChange: any = [];
  clientUser: any;
  address: any;
  constructor(private productsService: ProductsservicesService , private cartService: CartService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({next:(res)=>{
      this.products = res;
      this.allProductsNoChange = res;
    },error:(e)=>{
      console.log(e);
    },complete:()=>{}})
  }

  addToCart(product: any, event: any){
    event.target.disabled = true;
    const username = localStorage.getItem('username');
    // this.userService.getClientUserByUsername(username).subscribe({next:(res)=>{
    //   this.clientUser = res;
    //   console.log(this.clientUser)
    // },error:(e)=>{
    //   console.log(e);
    // },complete:()=>{
    //   this.addressService.getAddressByClientID(this.clientUser.cid).subscribe({next:(res)=>{
    //     console.log(res);
    //     this.address = res;
    //   },error: (e)=>{
    //     console.log(e)
    //   },complete:()=>{
        
    //   }});
    // }});
    const newProduct = {username:username, ostatus:"pending", pid:product.pid,olqtty:1,olprice:product.pprice}
    this.cartService.addToCart(newProduct).subscribe({next:(res)=>{
    },error: (e) => {
        },complete: () => {
        },
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }


  collapseNavBar() {
    let x = document.getElementById("myTopNav") as HTMLElement;
    if (x.className === "navigation") {
      x.className += " responsive";
    } else {
      x.className = "navigation";
    }
  }

  searchProduct(event: any){
    this.productSearch = event.target.value;
    this.searchProductResult(this.productSearch);
  }

  searchProductResult(search: string) {
    this.productsService.searchProduct(search).subscribe({next:(res)=>{
      if(res){
        this.products = res;
      }
      else{
        this.products = this.allProductsNoChange;
      }
    },error:(e)=>{
    },complete:()=>{
    }})
  }
}
