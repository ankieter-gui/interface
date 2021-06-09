import { Injectable } from '@angular/core';
import {BACKEND_URL} from './Configuration';
import {HttpClient} from '@angular/common/http';

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
  constructor(private http:HttpClient, private window:Window) {

  }
  async downloadUserData(){
    let result = await (this.http.get<{logged:boolean, id:string, username:string}>(`${BACKEND_URL}/user`,{withCredentials:true}).toPromise())
    if (!result.logged) this.window.location.href = "http://localhost:5000"
    this._userId = result.id
    this._username =  result.username
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

}
