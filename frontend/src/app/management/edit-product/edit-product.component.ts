import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductsservicesService } from 'src/app/services/productsservices.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  ProductForm!: FormGroup;
  level: any;
  allUsers: any = [];
  showHideValue: any;
  productID: any;
  product: any;
  constructor(private productService: ProductsservicesService,private toastr: ToastrService, private userService: UserService, private modalService: NgbModal,) { }

  ngOnInit(): void {
     this.ProductForm = new FormGroup({
            description: new FormControl('',Validators.required),
            price: new FormControl('',Validators.required),
            imageurl: new FormControl('',Validators.required),
            ShowHide: new FormControl('',Validators.required),
        });
        this.setProductDefaultValue();
  }

  setProductDefaultValue(){
    this.productService.getProductById(this.productID).subscribe({next:(res)=>{
      this.product = res;
      this.ProductForm.controls['description'].setValue(this.product.pdesc);
      this.ProductForm.controls['price'].setValue(this.product.pprice);
      this.ProductForm.controls['imageurl'].setValue(this.product.imageurl);
      this.ProductForm.controls['ShowHide'].setValue(this.product.pshow);
    },error:(e)=>{
    },complete:()=>{
    }})
  }

  submitProduct(){
    if(this.ProductForm.invalid){
      return;
    }
    let newProduct = {...this.ProductForm.value}
    this.productService.updateProductById(newProduct,this.productID).subscribe((res)=>{
      this.toastr.success("Product Updated Successfully")
    })
  }

}
