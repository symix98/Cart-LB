import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm!: FormGroup;
  constructor(private userService: UserService, private toastr: ToastrService, private activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl('',Validators.required),
            level: new FormControl('',Validators.required),
        });
  }

    submitUserForm(){
    if(this.userForm.invalid){
      return;
    }
    let newUser = {...this.userForm.value};
    this.userService.createNewUser(newUser).subscribe({next:(res)=>{
      this.activeModal.close();
      this.toastr.success("User Created Successfully!");
    },error: (e) => {
          this.toastr.warning("Couldn't Create User, Please try Again");
        },complete: () => {
        },
      })
  }

}
