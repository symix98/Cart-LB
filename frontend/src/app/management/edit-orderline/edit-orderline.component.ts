import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-edit-orderline',
  templateUrl: './edit-orderline.component.html',
  styleUrls: ['./edit-orderline.component.css']
})
export class EditOrderlineComponent implements OnInit {

  orderID: any;
  username: any;
  response: any;
  products: any;
  orderlines: any;
  orderStatusResponse: any;
  message: any;

  constructor(private cartService: CartService , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cartService.getOrderLineByID(this.orderID).subscribe({next:(res)=>{
     this.response = res;
     this.products = this.response.data.products;
     this.orderlines = this.response.data.orderline;
    },error:(e)=>{

    },complete:()=>{

    }});
  }

  completeIncompleteOrder(status: any){
    this.cartService.updateOrderStatus(this.username,status).subscribe({next:(res)=>{
      this.orderStatusResponse = res;
      this.message = this.orderStatusResponse.message;
      this.toastr.success(this.message);
    },error: (e) => {
        },complete: () => {

        },
      });
  }

}
