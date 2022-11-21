import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { MailerService } from 'src/app/services/mailer.service';
import { UserService } from 'src/app/services/user.service';
import { AddAddressComponent } from '../add-address/add-address.component';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  response: any;
  productsCartItems: any;
  products: any;
  totalPrice: any = 0;
  netPrice: any = this.totalPrice + 25000;
  productsWithQuantities: any = [];
  subtotal:any = 0;
  addresses: any;
  checkoutForm!: FormGroup;
  clientInfo: any;
  username = localStorage.getItem('username');
  status: any;
  emailObject: any;
  clientSelectedAddress: any;

  constructor(private router: Router , private toastr: ToastrService , private mailerService: MailerService , private userService: UserService, private cartService: CartService, private modalService: NgbModal, private addressService: AddressService) { }

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
            selectedAddress: new FormControl('',Validators.required),
        });
    this.cartService.getCart(localStorage.getItem('username')).subscribe({next:(res)=>{
     this.response = res;
     this.productsCartItems = this.response.data;
     this.products = this.response.data.products;
     this.productsCartItems.cartItems.map((item: any)=>{
      this.totalPrice += item.olprice * item.olqtty;
      this.subtotal += item.olqtty
     });
     this.netPrice = this.totalPrice + 25000;
    },error: (e) => {
        },complete: () => {
        },
      });
      this.getAddresses();
  }

  getAddresses(){
  this.addressService.getAllAddresses(this.username).subscribe({next:(res)=>{
        this.addresses = res;
    },error: (e) => {
        },complete: () => {
        },
      });
    }

  submitCheckoutForm(){
    const { selectedAddress } = this.checkoutForm.value;
    if(selectedAddress){
    this.userService.getClientByID(this.addresses[0].cid).subscribe({next:(res)=>{
      this.clientInfo = res;
      this.emailObject = { oid:this.response.data.cartItems[0].oid , cid:this.clientInfo.cid , cname: this.clientInfo.cname , cmid: this.clientInfo.cmid , clast: this.clientInfo.clast , cphone: this.clientInfo.cphone , selectedAddress: selectedAddress , totalPrice: this.totalPrice, netPrice: this.netPrice, products: this.products, items: this.productsCartItems.cartItems };
    },error: (e) => {
        },complete: () => {
          if(!selectedAddress){
          this.toastr.warning("Please select address!");
          }else{
          this.addressService.getAddressByClientID(this.addresses[0].cid).subscribe({next:(res)=>{
            this.clientSelectedAddress = res;
          },error:()=>{

          },complete:() => {
            this.cartService.updateOrderAddressByUsername(localStorage.getItem('username'),this.clientSelectedAddress.addrid).subscribe({next:(res)=>{
            },error:(e)=>{
            },complete:()=>{}})
          },})
          this.mailerService.sendEmail(this.emailObject).subscribe({next:(res)=>{
    },error: (e) => {
        },complete: () => {
        },
        
      });
      this.toastr.success("Order Submitted Successfully!");
      this.status = "progress";
      this.cartService.updateOrderStatus(this.username,this.status).subscribe({next:(res)=>{},error: (e) => {
      },complete: () => {
        this.router.navigate(['/']);
      },})
    }
        },
      });
    }else{
      this.toastr.warning("Please add or select address!");
    }
  }

  addAddress(){
    const modalRef = this.modalService.open(
      AddAddressComponent,
      { centered: true }
    );
    modalRef.closed.subscribe(res=>{
      this.getAddresses();
    })
  }
}
