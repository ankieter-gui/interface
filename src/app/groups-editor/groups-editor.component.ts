import { Component, OnInit } from '@angular/core';
import {MockService} from '../mock.service';
import {DashboardModalsService} from '../dashboard-modals.service';
import {SharingService} from '../sharing.service';
import {UserService} from '../user.service';
import {OtherUser} from '../dataModels/UserGroup';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-groups-editor',
  template: `
<section style="display:flex; flex-direction: row">
     <button nz-button nzType="default" style="margin-bottom:2rem" (click)="dashboardModals.openNewGroupDialog()"> <i nz-icon nzType="folder-add"></i>Utwórz nową grupę</button>
     <button nz-button nzType="default" style="margin-bottom:2rem;margin-left:1rem" (click)="dashboardModals.openNewUserDialog()"> <i nz-icon nzType="user"></i>Nowy użytkownik</button>
</section>
     <section class="container">
     <section class="groups-list-container column">


       <h1 style="font-family: Gilroy ExtraBold, sans-serif">Grupy</h1>
        <input nz-input [(ngModel)]="groupSearchValue" placeholder="Wyszukaj grupę po nazwie...">
       <nz-collapse style="margin-top:1.5em">
         <nz-collapse-panel *ngFor="let groupName of sharing.allGroupNames | filterString: groupSearchValue" [nzHeader]="groupName + ' ('+sharing.allGroups[groupName].length+')' | titlecase">
           <nz-list>
             <nz-list-item *ngFor="let user of sharing.allGroups[groupName]">
               <span nz-typography>{{user.casLogin}}</span>
               <ul nz-list-item-actions>
                 <nz-list-item-action><a (click)="excludeUser(groupName, user)">Usuń <i nz-icon nzType="delete"></i> </a></nz-list-item-action>

               </ul>
             </nz-list-item>
             <nz-list-item>
               <div class="add-container"><div>
                 Dodaj nowe osoby<i nz-icon nzType="plus" nzTheme="outline"></i></div>
                 <app-user-search-combobox style="margin-top:5px" placeholder="Szukaj po nazwisku..." (onSelect)="addUserToGroup(groupName, $event)"></app-user-search-combobox>
               </div>

             </nz-list-item>
           </nz-list>
         </nz-collapse-panel>
       </nz-collapse>
     </section>
     <section class="users-list-container column">
       <h1 style="font-family: Gilroy ExtraBold, sans-serif">Użytkownicy</h1>
       <input nz-input [(ngModel)]="userNameSearchValue" placeholder="Wyszukaj po nazwie...">
       <nz-table #basicTable [nzData]="this.sharing.users() | filterByField: 'casLogin':userNameSearchValue" nzShowPagination [nzPageSize]="10" style="margin-top:1.5em;">
         <thead>
         <tr>
           <th nzCustomFilter>
             Name
             <nz-filter-trigger [(nzVisible)]="visible" [nzActive]="userNameSearchValue.length > 0" [nzDropdownMenu]="menu">
               <i nz-icon nzType="search"></i>
             </nz-filter-trigger>
           </th>
           <th></th>

         </tr>
         </thead>
         <tbody>
         <tr *ngFor="let data of basicTable.data">
           <td>{{data.casLogin}} </td> <td> <i nz-icon nzType="delete" style="margin-left:1em;cursor: pointer" (click)="remove(data)"></i></td>
           <!--            <td>{{data.age}}</td>-->
           <!--            <td>{{data.address}}</td>-->
           <td>

             <nz-divider nzType="vertical"></nz-divider>
<!--             <a (click)="selected.push(data)" *ngIf="!isElementOnList(data)" [@fadeInOut]>Dodaj</a>-->
<!--             <a (click)="removeSelected(data)" *ngIf="isElementOnList(data)" [@fadeInOut]>Usuń</a>-->
           </td>
         </tr>
         </tbody>
       </nz-table>
     </section>
   </section>
   <nz-dropdown-menu #menu="nzDropdownMenu">
     <div class="ant-table-filter-dropdown">
       <div class="search-box">
         <input type="text" nz-input placeholder="Search name" [(ngModel)]="userNameSearchValue" />
         <button nz-button nzSize="small" nzType="primary" (click)="null" class="search-button">
           Search
         </button>
         <button nz-button nzSize="small" (click)="userNameSearchValue=''">Reset</button>
       </div>
     </div>
   </nz-dropdown-menu>
  `,
  styles: [
    `.container{
      display:flex; flex-wrap: wrap;
      justify-content: space-evenly;
    }
    .column{
      width:47%;
      min-width: 350px;
    }
    .add-container{

    }

    `
  ]
})
export class GroupsEditorComponent implements OnInit {
  activePanels:string[];
  userNameSearchValue=""
  groupSearchValue=""
  visible=false;
  constructor( public dashboardModals:DashboardModalsService, public sharing:SharingService, public user:UserService, public message:NzMessageService) { }

  ngOnInit(): void {
    this.sharing.downloadAllGroups()
  }
  async addUserToGroup(groupName, user:OtherUser){
    await this.sharing.updateGroup(groupName, [...this.sharing.allGroups[groupName].map(d=>d.id), user.id]).toPromise()
    await this.sharing.downloadAllGroups()
  }
 async excludeUser(groupName, user){
      await this.sharing.removeUserFromGroup(groupName,[user.id]).toPromise()
    await this.sharing.downloadAllGroups()
  }
async remove(user){
    this.dashboardModals.openDeleteConfirmationDialog(user.name, async (i,m)=>{
      await this.user.removeUser(user.id);
      this.sharing._allUsersCache = this.sharing._allUsersCache.filter(d=>d.id!=user.id)
      this.message.success("Usunięto")
      m.destroy()

    })


}
}
