import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-global-sidemenu',
  template: `



      <div style="height: 45px;"></div>
      <ul nz-menu nzTheme="dark" nzMode="inline">
        <li nz-submenu nzTitle="User" nzIcon="user">
          <ul>
            <li nz-menu-item>Tom</li>
            <li nz-menu-item>Bill</li>
            <li nz-menu-item>Alex</li>
          </ul>
        </li>
        <li nz-submenu nzTitle="Team" nzIcon="team">
          <ul>
            <li nz-menu-item>Team 1</li>
            <li nz-menu-item>Team 2</li>
          </ul>
        </li>
        <li nz-menu-item>
          <i nz-icon nzType="file"></i>
          <span>File</span>
        </li>
      </ul>


  `,
  styles: [
  ]
})
export class GlobalSidemenuComponent implements OnInit {
 // @ViewChild('template', {static: true}) template;
  constructor( private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
   // this.viewContainerRef.createEmbeddedView(this.template);
  }

}
