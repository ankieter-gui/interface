import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-global-sidemenu',
  template: `



      <div style="height: 45px;"></div>
      <ul nz-menu nzTheme="dark" nzMode="inline">
        <li nz-menu-item  [routerLink]="'/'">
          <i nz-icon nzType="folder"></i>
          <span>Ankiety i raporty</span>
        </li>
        <li *ngIf="user.userResponse.role=='s'" nz-menu-item [routerLink]="['groups']">
          <i nz-icon nzType="user"></i>
          <span>Grupy udostępniania</span>
        </li>
      </ul>


  `,
  styles: [
  ]
})
export class GlobalSidemenuComponent implements OnInit {
 // @ViewChild('template', {static: true}) template;
  constructor( private viewContainerRef: ViewContainerRef, public user:UserService) { }

  ngOnInit(): void {
   // this.viewContainerRef.createEmbeddedView(this.template);
  }

}
