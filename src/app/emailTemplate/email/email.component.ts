import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

const email = document.documentElement.outerHTML

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit{
  constructor(
    private dataservice:DataService,
    private authservice: AuthService
  ){}
  
  ngOnInit(): void {
    console.log('email')
    // localStorage.()
  }


}

