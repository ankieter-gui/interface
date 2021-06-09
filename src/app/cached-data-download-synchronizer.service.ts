import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {SharingService} from './sharing.service';

@Injectable({
  providedIn: 'root'
})
export class CachedDataDownloadSynchronizerService {

  constructor(private user:UserService, private sharing:SharingService) {
    this.download()
  }
  async download(){
    await  this.user.downloadUserData();
    await  this.sharing.downloadAllUsers()
    await this.sharing.downloadMyGroups()
  }
}
