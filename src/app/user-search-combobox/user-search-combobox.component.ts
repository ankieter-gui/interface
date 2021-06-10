import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OtherUser} from '../dataModels/UserGroup';
import {UserService} from '../user.service';
import {SharingService} from '../sharing.service';

@Component({
  selector: 'app-user-search-combobox',
  template: `
    <input placeholder="{{placeholder}}" nz-input [(ngModel)]="searchModel" (ngModelChange)="null"
           [nzAutocomplete]="auto"/>
    <nz-autocomplete #auto>
      <nz-auto-option class="global-search-item" *ngFor="let user of share.users() | filterByField: 'casLogin':searchModel"
                      [nzValue]="user.id" (click)="searchModel=''; onSelect.emit(user)">
        {{ user.casLogin }}

      </nz-auto-option>
    </nz-autocomplete>
  `,
  styles: [
  ]
})
export class UserSearchComboboxComponent implements OnInit {
  selected: OtherUser[] = [];
  searchModel: string;

  @Input()
  placeholder:string;
  @Output()
  onSelect:EventEmitter<OtherUser> = new EventEmitter<OtherUser>();
  //TODO: cast event upwards
  constructor(public user:UserService, public share:SharingService) { }

  ngOnInit(): void {
    console.log(this.share.users())
  }

}
