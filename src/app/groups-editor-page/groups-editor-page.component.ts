import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups-editor-page',
  template: `
    <nz-layout>

      <nz-sider nzCollapsible nzWidth="200px" nzCollapsible nzBreakpoint="lg" [nzCollapsedWidth]="0">
        <app-global-sidemenu></app-global-sidemenu>
      </nz-sider>


      <nz-layout>
        <nz-header>
          <img src="assets/logoAnkieter.PNG" height="100%" style="margin-left: 1rem;">

          <div>
            <app-user-indicator></app-user-indicator>
          </div>
        </nz-header>
        <nz-content>
          <nz-breadcrumb>
            <nz-breadcrumb-item ><a [routerLink]="'/'">Ekran główny</a></nz-breadcrumb-item>
            <nz-breadcrumb-item>Grupy udostępniania</nz-breadcrumb-item>

          </nz-breadcrumb>
          <div class="inner-content">
                <app-groups-editor></app-groups-editor>


          </div>
        </nz-content>
        <nz-footer>UAM - Ankieter+</nz-footer>
      </nz-layout>
    </nz-layout>

  `,
  styles: [
    `
      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }

      nz-header {
        background: #fff;
        padding: 0;
        display: flex;
        align-items: center;

      }

      nz-content {
        margin: 0 16px;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      .inner-content {
        animation: slide-top-enter-animation 0.9s cubic-bezier(0.250, 0.460, 0.450, 0.940) ;
        padding: 24px;
        background: #fff;
        min-height: 100vh;

      }
      @keyframes slide-top-enter-animation {
        100% {

          transform: translateY(0);
          opacity: 1;
        }
        0% {

          transform: translateY(100px);
          opacity: 0;
        }
      }

    `
  ]
})
export class GroupsEditorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
