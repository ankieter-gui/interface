import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OtherUser} from '../dataModels/UserGroup';

@Component({
  selector: 'app-user-search-combobox',
  template: `
    <input placeholder="{{placeholder}}" nz-input [(ngModel)]="searchModel" (ngModelChange)="updateUsersListCacheByName(searchModel)"
           [nzAutocomplete]="auto"/>
    <nz-autocomplete #auto>
      <nz-auto-option class="global-search-item" *ngFor="let user of currentUsersList"
                      [nzValue]="user.name" (click)="onSelect.emit(user)">
        {{ user.name }}

      </nz-auto-option>
    </nz-autocomplete>
  `,
  styles: [
  ]
})
export class UserSearchComboboxComponent implements OnInit {
  selected: OtherUser[] = [];
  searchModel: string;
  currentUsersList: OtherUser[] = [];
  @Input()
  placeholder:string;
  @Output()
  onSelect:EventEmitter<OtherUser> = new EventEmitter<OtherUser>();
  //TODO: cast event upwards
  constructor() { }

  ngOnInit(): void {
  }
  updateUsersListCacheByName(name:string): void{
    if (name.length==0){ this.currentUsersList=[]; return;}
    this.currentUsersList = [{name: "Stefan Janecki", uid: "xxx-yyy"}]
  }
}
