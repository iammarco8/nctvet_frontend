import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  isLoggedIn?: boolean = false;

  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.authService.logoutUser();
      this.router.navigate(['/home'])
    }else{
      Swal.fire({
        icon:'error',
        title:'No User Currently logged in',
      })
      this.router.navigate(['/home'])
    }
  }

}
