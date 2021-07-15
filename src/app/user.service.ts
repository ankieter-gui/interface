import { Injectable } from '@angular/core';
import {BACKEND_URL, LOGIN_SERVICE_URL} from './Configuration';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _userId:string = ""
  get userId():string{
    return this._userId
  }
  _username:string = ""
  get username():string{
    return this._username
  }
  constructor(private http:HttpClient, private window:Window, private router:Router, private route:ActivatedRoute) {

  }
  userResponse;
  isUserDataBeingDownloaded=false;
  async downloadUserData(){
    this.isUserDataBeingDownloaded=true;
    let result = await (this.http.get<{logged:boolean, id:string, casLogin:string, error?:string}>(`${BACKEND_URL}/user`,{withCredentials:true}).toPromise())
    if (!result.logged) {
      if (result.error && result.error.includes("could not obtain user data") ){
          this.router.navigate(['/unauthorized'])
        this.isUserDataBeingDownloaded=false;
      }else {
        //TODO: could this be done better?
        if (!this.isUnrestrictedPage){
          this.router.navigate(['/login'])
          this.isUserDataBeingDownloaded=false;

          // this.window.location.href = LOGIN_SERVICE_URL
        }

      }
    }
    this._userId = result.id
    this._username =  result.casLogin
    this.isUserDataBeingDownloaded=false;
    this.userResponse=result
    console.log(this.userResponse)
  }
  logged(): boolean{
    console.log(document.cookie)
    const c = this.getCookie("session")
    console.log(c)
    if (c){
      return true;
    }
    return false;

  }
  get isUnrestrictedPage(){
    return (this.router.url.includes("share")||this.router.url.includes("unauthorized"))
  }
  redirectToCASLogin(){
    window.location.href = `${BACKEND_URL}/login`
  }
  getCookie(name):string {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    }
    else
    {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = dc.length;
      }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  }
  logout(){
    this.window.location.href = `${BACKEND_URL}/logout`
  }
 async removeUser(id){
    await (this.http.delete(`${BACKEND_URL}/user/${id}`, {withCredentials:true}).toPromise())
  }
}
