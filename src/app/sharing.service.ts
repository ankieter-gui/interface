import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND_URL} from './Configuration';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  users(){
    if (this._allUsersCache)
    return this._allUsersCache
    else {
    //  this.downloadAllUsers()
      return []
    }
  }
  _allUsersCache;
  constructor(private http:HttpClient, private user:UserService) { }
  async downloadAllUsers(){
    let response = await this.http.get<{users:any[]}>(`${BACKEND_URL}/users`, {withCredentials:true}).toPromise()
    this._allUsersCache = response.users
  }
  async downloadMyGroups(){
    let response = await this.http.get(`${BACKEND_URL}/group/list/${this.user.userId}`)

  }
  _myGroupsCache
  get myGroups():any[]{
    if (this._myGroupsCache)
      return this._myGroupsCache
    else {
      //this.downloadMyGroups()
      return []
    }
  }

}
