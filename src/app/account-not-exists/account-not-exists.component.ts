import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-account-not-exists',
  template: `
    <h1>
      <p>Konto nie jest uprawnione do logowania się do systemu.</p>
      <p>Skontaktuj się z administratorem aby uzyskać dostęp.</p>
      <button nz-button (click)="user.logout()">Wyloguj się</button>
    </h1>
  `,
  styles: [
  ]
})
export class AccountNotExistsComponent implements OnInit {

  constructor(public user:UserService) { }

  ngOnInit(): void {
  }

}
