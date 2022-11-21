import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FormBuilder, AuthService],
})
export class LoginComponent implements OnInit {

  loginCred: any;
  routecommitedByUser: any;
  constructor(private activatedRoute: ActivatedRoute, private modalService: NgbModal, private router: Router, private userService: UserService, private toastr: ToastrService) { }

  LoginForm!: FormGroup;
  token: any;
  ngOnInit(): void {
    localStorage.clear();
    this.routecommitedByUser = this.activatedRoute.snapshot.queryParamMap.get("commitedURL") || "/";
     this.LoginForm = new FormGroup({
            username: new FormControl('',Validators.required),
            password: new FormControl('',Validators.required),
        });
  }

  submitUserLogin(){
    if(this.LoginForm.invalid){
      this.toastr.warning("Login Form is Invalid!");
      return;
    }
    let newUser = {...this.LoginForm.value};
    this.userService.login(newUser).subscribe({next:(res)=>{
      this.toastr.success("User Logged In Successfully!");
      this.loginCred = res;
      this.token = res;
      localStorage.setItem('username',this.token.data.username);
      localStorage.setItem('token',this.token.message);
      localStorage.setItem('level',this.loginCred.data.level);
      if(this.token.data.level === 'admin' || this.token.data.level === 'data' || this.token.data.level === 'sales'){
      this.modalService.dismissAll();
      this.router.navigate(['/roguemin']);
      }
      else{
        this.modalService.dismissAll();
        if(this.routecommitedByUser){
        this.router.navigate([`/${this.routecommitedByUser}`]);
        }else{
          this.router.navigate(['']);
        }
      }
    },error: (e) => {
          this.toastr.warning("Something Went Wrong!");
        },complete: () => {
        },
      })
  }
  }