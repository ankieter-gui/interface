import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-user',
  template: `
   <input nz-input [(ngModel)]="casLogin" placeholder="cas login...">
   <nz-select [(ngModel)]="role" style="width:100%;margin-top:1rem;">
     <nz-option nzValue="u" nzLabel="Użytkownik" ></nz-option>
     <nz-option nzValue="s" nzLabel="Superadmin"></nz-option>
   </nz-select>
  `,
  styles: [
  ]
})
export class AddNewUserComponent implements OnInit {
casLogin:string;
role:string = 'u';

  constructor() { }

  ngOnInit(): void {
  }

}
