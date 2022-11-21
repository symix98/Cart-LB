import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  addressForm!: FormGroup;
  cities = ['Ain Baal - 20,000','Hanaway - 20,000','Burj Shamali - 30,000','Sour - 50,000','Hosh - 15,000'];
  username: any = localStorage.getItem('username');
  constructor(private addressService: AddressService , private userService: UserService, private toastr: ToastrService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.addressForm = new FormGroup({
            addrdesc: new FormControl(),
            addrdetails: new FormControl('',Validators.required),
            addrcity: new FormControl('',Validators.required),
        });
  }

  submitAddressForm(){
    if(this.addressForm.invalid){
      return;
    }
    this.addressForm.addControl('username', new FormControl());
    this.addressForm.controls['username'].setValue(this.username);
    let newAddress = {...this.addressForm.value};
    this.addressService.createAddress(newAddress).subscribe({next:(res)=>{
      this.activeModal.close();
      this.toastr.success("Address Added Successfully!");
    },error: (e) => {
          console.log(e);
          this.toastr.warning("Couldn't Add Address, Please try Again!");
        },complete: () => {
        },
      });
  }
}
