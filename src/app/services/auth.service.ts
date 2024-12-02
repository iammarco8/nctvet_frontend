import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // rout to connect to the backend 
  // this will reffer to the user when being used in this file
  // private API_URL = 'http://localhost:8878/api/assesment/v1/'
    private API_URL = 'http://192.168.100.81:8878/api/assesment/v1/'
  
  private tokenKey = 'authToken';

  public authToken?:string;
  public user1?:any;
  constructor(private http: HttpClient) { }


    // functioning variables to be appleid to injectable functions
    private _saveToStorage(key:string, value:any){
      localStorage.setItem(key, value);
    }
  
    saveAuthToken(
      // token:string
    ):void{
      this._saveToStorage( 
        this.tokenKey,
         this.authToken
        // token
        );
    }
    // function designed to authenticat if the user is logged in by using the token as a reference
    public isLoggedIn(): boolean{
      let token = localStorage.getItem(this.tokenKey)
      return token != null && token.length > 0;
    }
  // this retrieves the token that needs to be refered to
    public getToken():string | null{
      return this.isLoggedIn() ? localStorage.getItem(this.tokenKey): null;
    }
    loginUser(data:any):Observable<any>{
      return this.http.post<any>(this.API_URL + 'user/login', data)
      .pipe(
        map((res)=>{
          return res
        })
      );
    }
    logoutUser(): void{
      localStorage.removeItem(this.tokenKey);
    }

    getUserProfileInformation(): Observable<any>{
      return this.http.get<any>(this.API_URL +'user/userActive')
        .pipe(
          map((res)=>{
            return res
          })
        )
    }
    getCurrentUser(cb?: ()=> void){
      this.getUserProfileInformation().subscribe((res)=>{
        if (res['status']=== 'success'){
          this.user1 = res['data']!['user']; 
          if(cb){
            cb();
          }
        }
      })
    }
}