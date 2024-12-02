import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  constructor(private dataservice: DataService,
              private route: ActivatedRoute,
            private authservice: AuthService){}
  currentUser: number=0
  // currentUser: string=''
  tasks: any= [];
  ngOnInit(): void {
    this.fetchtasks();
    this.options();
    this.user();
  }

  fetchtasks(){
    this.dataservice.fullListTask().subscribe(res => {
    // this.dataservice.UserListTask().subscribe(res => {
      if(res['status']== 'success'){
        // console.log(res['data']!['task'])
        console.log(res.data!['task'])
        this.tasks = res.data!['task']
      }
    })
  }
 


  options(){
    if (this.authservice.isLoggedIn()){
      console.log(`Options`)
    }else{
      `Work on it`
    }
  }

  user(){
    this.authservice.getCurrentUser(()=>{
      this.user = this.authservice.user1.id
      // console.log(`here ${ JSON.stringify(this.user)}`)
    })
  }
}
  
