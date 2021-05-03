import {Component, Input, OnInit} from '@angular/core';
import {OtherUser} from '../dataModels/UserGroup';

@Component({
  selector: 'app-new-group-dialog',
  template: `
   <ng-container> Nazwa grupy (opcjonalnie)
    <input placeholder="Nazwa" nz-input [(ngModel)]="groupName"/>
    <span style="display:block;margin-top:25px;">Dodaj do grupy osoby:</span>
   </ng-container>
    <app-user-search-combobox (onSelect)="appendUser($event)" [placeholder]="placeholder"> </app-user-search-combobox>
<section class="tags">
    <nz-tag nzMode="closeable" *ngFor="let user of this.selected" (nzOnClose)="removeUser(user)">{{user.name}}</nz-tag>
</section>

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
  constructor() { }
  selected:OtherUser[]=[];
  groupName: string;


  ngOnInit(): void {
  }
  removeUser(user: OtherUser): void{
    this.selected = this.selected.filter(u => u.uid !== user.uid);
  }
  appendUser(user: OtherUser): void{
    this.selected = this.selected.filter(u => u.uid !== user.uid);
    this.selected.push(user)
  }

}
