import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND_URL} from './Configuration';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  users(){
    if (this._allUsersCache)
    return this._allUsersCache
    else {
      this.downloadAllUsers()
      return []
    }
  }
  _allUsersCache;
  constructor(private http:HttpClient) { }
  async downloadAllUsers(){
    let response = await this.http.get<{users:any[]}>(`${BACKEND_URL}/users`, {withCredentials:true}).toPromise()
    this._allUsersCache = response.users
  }
}
