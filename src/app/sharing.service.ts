import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND_URL} from './Configuration';
import {UserService} from './user.service';
import {OtherUser} from './dataModels/UserGroup';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

 _usersBeingDownloaded=false;
  users():OtherUser[]{
    if (this._allUsersCache)
    return this._allUsersCache
    else {
      if (!this._usersBeingDownloaded) {

      this._usersBeingDownloaded = true;
      this.downloadAllUsers()
    }

    }
  }
  _allUsersCache;
  constructor(private http:HttpClient, private user:UserService) { }
  async downloadAllUsers(){
    let response = await this.http.get<{users:any[]}>(`${BACKEND_URL}/user/all`, {withCredentials:true}).toPromise()
    this._allUsersCache = response.users
  }
  async downloadMyGroups(){
    let response = await this.http.get(`${BACKEND_URL}/user/${this.user.userId}/group`, {withCredentials:true}).toPromise()
    this._myGroupsCache=[]
  }

  async downloadAllGroups(){

    let response = await this.http.get(`${BACKEND_URL}/group/all`, {withCredentials:true}).toPromise()
    this._allGroupsCache=response
  }

  _allGroupsCache
  _allGroupsCacheBeingDownloaded=false;
  get allGroups(){
    if (this._allGroupsCache)
      return this._allGroupsCache
    else {
      if (!this._allGroupsCacheBeingDownloaded){
        this._allGroupsCacheBeingDownloaded=true;
        this.downloadAllGroups()

      }

    }
  }
  _myGroupsCache
  _myGroupsCacheBeingDownloaded=false;
  get myGroups():any[]{
    if (this._myGroupsCache)
      return this._myGroupsCache
    else {
      //this.downloadMyGroups()
      return []
    }
  }
  get allGroupNames(){
    let x = this.allGroups
    if (x) return Object.keys(x)
    else return []
  }

  shareReportToUsers(reportId,usersRead=[], usersWrite=[], usersNone=[]){
    return this.http.post(`${BACKEND_URL}/report/mod/${reportId}`, {"r":usersRead, "w":usersWrite, "n":usersNone})
  }
  updateGroup(groupName, userIds){
    const body = {}
    body[groupName] = userIds
    return this.http.post(`${BACKEND_URL}/group/change`, body)
  }

}
