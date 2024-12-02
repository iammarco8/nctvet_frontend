import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],

})
export class TaskCreateComponent implements OnInit {
  constructor(private dataservice:DataService,
    private authService:AuthService
  ){}
  user:any;
  userName:string = '';
  ngOnInit():void{
    this.UserID()
  }
  createTask(oForm: NgForm){
    this.dataservice.createTask(oForm.value).subscribe(res=>{
      if(res['status']=='success'){
        console.log(JSON.stringify(oForm.value))
        Swal.fire({
          icon:'success',
          title:"task made"
        })
      }else{
        Swal.fire({
          icon:'error',
          title:'Did not complete proccess'
        })
      }
    })
  }

  UserID(){
      this.authService.getCurrentUser(()=>{
        this.userName = this.authService.user1.id;
        console.log(`here ${JSON.stringify(this.userName)}`)
      })
  }
}
