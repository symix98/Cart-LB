import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('username');
  }

  async logout(){
    localStorage.clear();
    await this.router.navigate(['']);
    window.location.reload();
  }

  collapseNavBar() {
  let x = document.getElementById("myTopNav") as HTMLElement;
  if (x.className === "navigation") {
    x.className += " responsive";
  } else {
    x.className = "navigation";
  }
}
}
