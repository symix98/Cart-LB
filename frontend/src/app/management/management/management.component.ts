import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsservicesService } from 'src/app/services/productsservices.service';
import { UserService } from 'src/app/services/user.service';
import { EditOrderlineComponent } from '../edit-orderline/edit-orderline.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  noPictures: boolean = false;
  constructor(
    private router: Router,
    private productsService: ProductsservicesService,
    private productService: ProductsservicesService,
    private toastr: ToastrService,
    private userService: UserService,
    private modalService: NgbModal,
    private cartService: CartService,
    ) { }

  price: any;
  description: any;
  imageurl: any;
  ProductForm!: FormGroup;
  userForm!: FormGroup;
  level: any;
  allUsers: any = [];
  allProducts: any = [];
  result: any = [];
  allProductsNoChange: any = [];
  showHideValue: any;
  showAllUsers: boolean = false;
  showOrders: boolean = false;
  showAllCompletedOrders: boolean = false;
  showAllInCompletedOrders: boolean = false;
  showCreateUserForm: boolean = false;
  showCreateProduct: boolean = false;
  showAllProducts: boolean = false;
  productSearch!: string;
  allOrders: any = [];
  ngOnInit(): void {
    this.level = localStorage.getItem('level');
    this.userService.getAllUsers().subscribe((res)=>{
      this.allUsers = res;
    });
     this.ProductForm = new FormGroup({
            barcode: new FormControl('',Validators.required),
            description: new FormControl('',Validators.required),
            price: new FormControl('',Validators.required),
            imageurl: new FormControl(''),
            ShowHide: new FormControl('',Validators.required),
        });
        this.userForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl('',Validators.required),
            level: new FormControl('',Validators.required),
        });
        this.productsService.getAllProducts().subscribe((res)=>{
      this.allProducts = res;
      this.allProductsNoChange = res;
    });
  }

  setNoPictures(completed: boolean) {
    this.noPictures = completed;
     if(this.noPictures){
      this.allProducts = this.allProducts.filter((product: any)=>{
        return product.imageurl === '';
      })
      }
      else{
        this.allProducts = this.allProductsNoChange;
      }
  }

  showAllOrders(){
    this.showOrders = !this.showOrders;
    this.showAllCompletedOrders = false;
    this.showAllInCompletedOrders = false;
    this.cartService.getAllOrders().subscribe({next:(res)=>{
     this.allOrders = res;
    },error: (e) => {
        },complete: () => {
        },
      });
  }

  showCompletedOrders(){
    this.showOrders = false;
    this.showAllCompletedOrders = !this.showAllCompletedOrders;
    this.showAllInCompletedOrders = false;
    this.cartService.getCompletedOrders().subscribe({next:(res)=>{
     this.allOrders = res;
    },error: (e) => {
        },complete: () => {
        },
      });
  }

  showInCompletedOrders(){
    this.showOrders = false;
    this.showAllCompletedOrders = false;
    this.showAllInCompletedOrders = !this.showAllInCompletedOrders;
    this.cartService.getInCompletedOrders().subscribe({next:(res)=>{
     this.allOrders = res;
    },error: (e) => {
        },complete: () => {
        },
      });
  }

  completeOrder(username: any,status:any){
    this.cartService.updateOrderStatus(username,status).subscribe({next:(res)=>{
    },error: (e) => {
;
          this.toastr.warning("Couldn't Create User, Please try Again");
        },complete: () => {
        },
      });
  }

showAllUsersDiv(){
  this.showAllUsers = !this.showAllUsers;
  if(this.showCreateUserForm){this.showCreateUserForm = !this.showCreateUserForm;}
}
showCreateUser(){
    this.showCreateUserForm = !this.showCreateUserForm;
    if(this.showAllUsers){this.showAllUsers = !this.showAllUsers;}
  }
showAllProductsDiv(){
  this.showAllProducts = !this.showAllProducts;
  if(this.showCreateProduct){this.showCreateProduct = !this.showCreateProduct;}
  let searchBox = document.getElementById('searchBox') as HTMLElement;
  searchBox.setAttribute("style", "display:inline;");
}
showCreateProductDiv(){
  this.showCreateProduct = !this.showCreateProduct;
  if(this.showAllProducts){this.showAllProducts = !this.showAllProducts;}
  let searchBox = document.getElementById('searchBox') as HTMLElement;
  searchBox.setAttribute("style", "display:none;");
}
  editUser(username: any){
    const modalRef = this.modalService.open(
      EditUserComponent,
      { centered: true }
    );
    modalRef.componentInstance.username = username;
  }

  editProduct(productID: any){
  const modalRef = this.modalService.open(
      EditProductComponent,
      { centered: true }
    );
    modalRef.componentInstance.productID = productID;
  }

  submitProductForm(){
    if(this.ProductForm.invalid){
      return;
    }
    let newProduct = {...this.ProductForm.value}
    this.productService.createNewProduct(newProduct).subscribe((res)=>{
      this.toastr.success("Product Inserted Successfully")
    })
  }
  
  submitUserForm(){
    if(this.userForm.invalid){
      return;
    }
    let newUser = {...this.userForm.value};
    this.userService.createNewUser(newUser).subscribe({next:(res)=>{
      this.toastr.success("User Created Successfully!");
    },error: (e) => {
          this.toastr.warning("Couldn't Create User, Please try Again");
        },complete: () => {
        },
      })
  }

  searchProduct(event: any){
    this.productSearch = event.target.value;
    this.searchProductResult(this.productSearch);
  }

  searchProductResult(search: string) {
    this.productsService.searchProduct(search).subscribe({next:(res)=>{
      if(res){
        this.allProducts = res;
      }
      else{
        this.allProducts = this.allProductsNoChange;
      }
    },error:(e)=>{
    },complete:()=>{
    }})
  }

  openEditOrderLine(id: number , username: string){
    const modalRef = this.modalService.open(
      EditOrderlineComponent,
      { centered: true }
    );
    modalRef.componentInstance.orderID = id;
    modalRef.componentInstance.username = username;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
