import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasError: boolean = false;
  errorMessage: string = '';
  user: any;
  isAdmin: boolean= true;
  isDoctor: boolean = false;
  constructor(private authService: AuthService,
        private router:Router,
  ){ }
  // private docLink = '/doctors';
  // private adminLink ='/admins';
  // private adminLink ='/home';
  currentUser: string = '';
  ngOnInit(): void {
  }

  loginUser(oForm: NgForm): void{
    
      // console.log(oForm.value)
    this.authService.loginUser(oForm.value).subscribe(
      // next:
      (res)=>{
        if(res['status']== 'success'){
          this.authService.authToken = res['data']!['token'];
          // console.log(`TOKEN ${this.authService.authToken}`)
          this.authService.saveAuthToken();
          let savedToken = this.authService.getToken();
          // let savedToken = this.authService.saveAuthToken();
          // console.log(`Saved token:${savedToken}`)
          this.authService.getCurrentUser(()=>{
            this.user = this.authService.user1;
            // console.log(`the user info is: ${JSON.stringify(this.user)}`);
            // this.currentPos = this.user.id;
            console.log(`user id is: ${this.currentUser}`)
            this.router.navigate(['/tasks'])
          });
        } 
      },
      (err)=>{
        this.hasError = true;
        this.errorMessage= err.error.massage
      }
    );
  }
}
