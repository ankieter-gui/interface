import { Component, OnInit } from '@angular/core';
import {MockService} from '../mock.service';

@Component({
  selector: 'app-groups-editor',
  template: `
   <section class="container">
     <section class="groups-list-container column">
       <button nz-button nzType="default" style="margin-bottom:2rem"> <i nz-icon nzType="folder-add"></i>Utwórz nową grupę</button>

       <nz-collapse>
         <nz-collapse-panel *ngFor="let group of mockService.mockUsersAndGroupsData.groups" [nzHeader]="group.name + ' ('+group.users.length+')' | titlecase">
           <nz-list>
             <nz-list-item *ngFor="let uid of group.users">
               <span nz-typography>{{this.uidToName(uid)}}</span>
               <ul nz-list-item-actions>
                 <nz-list-item-action><a (click)="null">edit</a></nz-list-item-action>
                 <nz-list-item-action><a (click)="null">more</a></nz-list-item-action>
               </ul>
             </nz-list-item>
           </nz-list>
         </nz-collapse-panel>
       </nz-collapse>
     </section>
     <section class="users-list-container column">
       users here
     </section>
   </section>
  `,
  styles: [
    `.container{
      display:flex;
    }
    .column{
      width:50%;
    }

    `
  ]
})
export class GroupsEditorComponent implements OnInit {
  activePanels:string[];
  uidToName(uid:string):string{
    return this.mockService.mockUsersAndGroupsData.users.filter(e=>e.uid==uid)[0].name;
}
  constructor(public mockService:MockService) { }

  ngOnInit(): void {
  }

}
