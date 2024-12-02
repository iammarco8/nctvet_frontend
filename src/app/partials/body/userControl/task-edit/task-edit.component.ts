import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit{
admin: any;
task_name: any;
date_assigned: any;
date_due:any;
description:any;
status: any;
note:any;
  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService
  ){}
  // currentUser: any= [];
  id : number=0;
  // currentTask: any=[];
  assignData: any=[];
  newDate: any;
  formDate: any;

  ngOnInit():void{
    var htmlFile1 = document.documentElement.innerHTML;
    // var htmlFile1 = document.documentElement.outerHTML;
    console.log(htmlFile1)  
    console.log('page loading correct');
    // console.log(this.currentTask['task_name']);
    this.id = this.route.snapshot.params['id'];
    // this.taskValues();
    console.log('page loader finished')
    
    if (this.id>0){
      // this needs to be sorted 
      
      // console.log('the id from the "if function"'+ JSON.stringify(this.id))
      this.dataservice.singleTask(this.id).subscribe(res => {
        if(res['status']=='success'){
          // const assignData = res!['data']!['currentTask'];
          const assignData = res!['data']!['task'];
            this.formDate = assignData['date_due'];
            this.newDate = this.formDate.split('T');
          console.log(`this is within the if statement ${JSON.stringify(assignData)}`)
          this.assignForm?.setValue({
            admin: assignData['admin'],
            task_name: assignData['task_name'],
            date_assigned: assignData['date_assigned'],
            // the form date value includes a speific time and interupts the sql syntax execution
            // this will remove the '00:00.0' section
            // date_due: assignData['date_due'] ,
            date_due: this.newDate[0] ,
            description: assignData['description'],
            status: assignData['status'],
            note: assignData['note'],
            user_assigned: assignData['user_assigned']
            // admin: assignData['admin']
          });
          // console.log(`assign form , look for the date due value ${this.assignForm()}`)
          console.log('hello')
        }
      });
    }
    // console.log(`this is here in task edit ${this.dataservice.singleTask(this.id)}`);
  }
  @ViewChild('assignForm')assignForm?:NgForm;

  // taskValues(){
  //   this.dataservice.singleTask(this.id).subscribe(res=>{
  //     if(res['status']== 'success'){
  //       this.currentTask = res.data!['task']
  //       // console.log(res.data!['task'])
  //       console.log('task value function' +JSON.stringify( this.currentTask))
  //     }else{
  //       'not successful'
  //     }
  //   })
  // }

  updateTask(oForm: NgForm){
    this.dataservice.updateTask(this.id, oForm.value).subscribe(res=>{
      console.log(`${this.newDate}`)

      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'Update successful'

        });
        this.router.navigateByUrl('/tasks')
        // this is the view page for the single task.
        // there is alot of freedom in good faith of the users.
      }else{
        Swal.fire({
          icon:'error',
          title:'Failed to Update'
        });
      }
    });
  }

  deleteTask(){
    this.dataservice.deleteTask(this.id).subscribe(res=>{
      if(res['status']=='success'){
        Swal.fire({
        icon: 'success',
        title: 'Successfully Deleted Assigned Student'
      });
      this.router.navigateByUrl('/tasks');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Failed to Delete Assigned Student'
        });
      }
    })
  }
}
