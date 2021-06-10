import {Component, Input, OnInit} from '@angular/core';
import {OtherUser} from '../dataModels/UserGroup';
import {SurveysService} from '../surveys.service';
import {SharingService} from '../sharing.service';

@Component({
  selector: 'app-new-group-dialog',
  template: `
   <ng-container> Nazwa grupy
     <nz-spin [nzSize]="'large'" *ngIf="updating"></nz-spin>
     <ng-container *ngIf="!updating">
    <input placeholder="Nazwa" nz-input [(ngModel)]="groupName"/>
    <span style="display:block;margin-top:25px;">Dodaj do grupy osoby:</span>
   </ng-container>
    <app-user-search-combobox (onSelect)="appendUser($event)" [placeholder]="placeholder"> </app-user-search-combobox>
<section class="tags">
    <nz-tag nzMode="closeable" *ngFor="let user of this.selected" (nzOnClose)="removeUser(user)">{{user.casLogin}}</nz-tag>
</section>
   </ng-container>
  `,
  styles: [
    `
    .tags{margin-top:15px;}
    `
  ]
})
export class NewGroupDialogComponent implements OnInit {
  @Input()
  fromAdminPanel:boolean;
@Input()
placeholder:string;
  constructor(private sharingService:SharingService) { }
  selected:OtherUser[]=[];
  groupName: string;
updating=false;

  ngOnInit(): void {
  }
  removeUser(user: OtherUser): void{
    this.selected = this.selected.filter(u => u.id !== user.id);
  }
  appendUser(user: OtherUser): void{
    this.selected = this.selected.filter(u => u.id !== user.id);
    this.selected.push(user)
  }

}
