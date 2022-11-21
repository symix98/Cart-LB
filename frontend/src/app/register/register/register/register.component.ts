import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

  RegisterForm!: FormGroup;
  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
            cname: new FormControl('',Validators.required),
            cmid: new FormControl('',Validators.required),
            clast: new FormControl('',Validators.required),
            cphone: new FormControl('',Validators.required),
            username: new FormControl('',Validators.required),
            password: new FormControl('',Validators.required),
        });
  }

  submitUserRegister(){
    if(this.RegisterForm.invalid){
      this.toastr.warning("Register form is not valid!");
      return;
    }
    let newUser = {...this.RegisterForm.value};
    this.userService.createNewClient(newUser).subscribe({next:(res)=>{
      this.toastr.success("Client Created Successfully!");
      window.location.reload();
    },error: (e) => {
          this.toastr.warning(e.error);
        },complete: () => {
        },
      })

  }

}
