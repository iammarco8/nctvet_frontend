import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  isLoggedIn? : boolean = false;
  loginText:string='Log In';
  // logoutText:string='Log Out';
  loginLink:string='/login'  
  constructor(private router: Router, private authService:AuthService){}
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      console.log(`logged in`)
      this.isLoggedIn=true;
      // console.log(JSON.stringify{this.isLoggedIn})
      console.log(this.isLoggedIn)
      this.loginText= 'Log Out';
      this.loginLink = '/logout'
    }else{
    console.log(`NO USER`)
    this.loginText= 'Login'; 
    this.loginLink='/login';
      this.isLoggedIn=false;
    } 
  }
}