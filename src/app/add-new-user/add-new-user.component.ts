import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-user',
  template: `
    <input nz-input [(ngModel)]="casLogin" placeholder="cas login...">
    <p *ngIf="error" style="color:red;">Użytkownik już istnieje!</p>
    <p>Mail jest wymagany, aby użytkownik mógł logować się nim w CAS</p>
    <input nz-input [(ngModel)]="pesel" placeholder="PESEL">
    <nz-select [(ngModel)]="role" style="width:100%;margin-top:1rem;">
      <nz-option nzValue="u" nzLabel="Użytkownik"></nz-option>
      <nz-option nzValue="s" nzLabel="Superadmin"></nz-option>
    </nz-select>
  `,
  styles: [
  ]
})
export class AddNewUserComponent implements OnInit {
casLogin:string;
  pesel: string;
  error: boolean = false;
  role: string = 'u';

  constructor() { }

  ngOnInit(): void {
  }

}
