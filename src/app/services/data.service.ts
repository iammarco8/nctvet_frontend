
// servvice file connects to the backend
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
// import { ApiResponse } from '../shared/models/api-response';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private API_URL = 'http://localhost:8878/api/assesment/v1'
  private API_URL = 'http://192.168.100.81:8878/api/assesment/v1'

  constructor(private _http:HttpClient) { }
  // service for full task list
  fullListTask():Observable<any>{
    return this._http.get<any>(this.API_URL+'/task')
    // http://localhost:8878/api/assesment/v1/task
    .pipe(
      map((res)=>{
        return res;
      })
    );
  }
  // retreives only one task
  singleTask(id: number):Observable<any>{
    return this._http.get<any>(this.API_URL +`/task/${id}`)
    .pipe(
      map((res)=>{
        return res
      })
    )
  };
  // connection for creating new task
  createTask(data:any):Observable<any>{
    return this._http.post<any>(this.API_URL + '/task', data)
    .pipe(
      map((res)=>{
        return res
      })
    );
  }
  // Front end connection to update tasks
  updateTask(id:number, data: any):Observable<any>{
    return this._http.patch(this.API_URL + `/task/${id}`, data)
    .pipe(
      map((res)=>{
        return res;
      })
    );
  }
  // allowance for delete a task
  deleteTask(id:number):Observable<any>{
    return this._http.delete<any>(this.API_URL+`/task/${id}`)
    .pipe(
      map((res)=>{
        return res;
      })
    )
  }
}
