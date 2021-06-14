import {Component, Input, OnInit} from '@angular/core';
import {ReportMeta} from '../dataModels/survey';
import {SharingService} from '../sharing.service';
import {fadeInOut} from '../commonAnimations'
import {FRONTEND_URL} from '../Configuration';
@Component({
  animations:[fadeInOut],
  selector: 'app-share-report',
  template: `
<!--    <div class="header">Udostępnij raport: {{this.report.name}}</div>-->
    <div class="input-with-label"><span class="label">Link do poglądu</span><input nz-input [value]="this.shareLinkRead"></div>
    <div class="input-with-label"><span class="label">Link do edycji</span><input nz-input [value]="this.shareLinkEdit"></div>
<nz-tabset>
  <nz-tab nzTitle="Użytkownicy">
<!--<nz-divider nzText="Indywidualni użytkownicy"></nz-divider>-->


        <input nz-input placeholder="Wyszukaj...">

        <nz-table #basicTable [nzData]="this.sharingService.users()" nzShowPagination [nzPageSize]="4">
          <thead>
          <tr>
            <th>Nazwa</th>
<!--            <th>Age</th>-->
<!--            <th>Address</th>-->
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let data of basicTable.data">
            <td>{{data.casLogin}}</td>
<!--            <td>{{data.age}}</td>-->
<!--            <td>{{data.address}}</td>-->
            <td>

              <nz-divider nzType="vertical"></nz-divider>
              <a (click)="selected.push(data)" *ngIf="!isElementOnList(data)" [@fadeInOut]>Dodaj</a>
              <a (click)="removeSelected(data)" *ngIf="isElementOnList(data)" [@fadeInOut]>Usuń</a>
            </td>
          </tr>
          </tbody>
        </nz-table>

  </nz-tab>
  <nz-tab nzTitle="Grupy">
<!--<nz-divider nzText="Grupy"></nz-divider>-->


    <input nz-input placeholder="Wyszukaj...">

    <nz-table #basicTable2 [nzData]="this.sharingService.allGroupNames" nzShowPagination [nzPageSize]="4">
      <thead>
      <tr>
        <th>Nazwa</th>
        <!--            <th>Age</th>-->
        <!--            <th>Address</th>-->
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let data of basicTable2.data">
        <td>{{data}}</td>
        <!--            <td>{{data.age}}</td>-->
        <!--            <td>{{data.address}}</td>-->
        <td>

          <nz-divider nzType="vertical"></nz-divider>
          <a (click)="selectedGroups.push(data)" *ngIf="!isElementOnListGroups(data)" [@fadeInOut]>Dodaj</a>
          <a (click)="removeSelectedGroup(data)" *ngIf="isElementOnListGroups(data)" [@fadeInOut]>Usuń</a>
        </td>
      </tr>
      </tbody>
    </nz-table>


  </nz-tab>
  <nz-tab nzTitle="Użytkownicy (wybierz przez grupy)">
    <nz-collapse style="margin-top:1.5em">
      <nz-collapse-panel *ngFor="let groupName of this.sharingService.allGroupNames | filterString: ''" [nzHeader]="groupName + ' ('+sharingService.allGroups[groupName].length+')' | titlecase">
        <nz-list>
          <nz-list-item *ngFor="let user of sharingService.allGroups[groupName]">
            <span nz-typography>{{user.casLogin}}</span>
            <ul nz-list-item-actions>
              <nz-list-item-action> <a (click)="selected.push(user)" *ngIf="!isElementOnList(user)" [@fadeInOut]>Dodaj</a>
                <a (click)="removeSelected(user)" *ngIf="isElementOnList(user)" [@fadeInOut]>Usuń</a></nz-list-item-action>

            </ul>
          </nz-list-item>

        </nz-list>
      </nz-collapse-panel>
    </nz-collapse>
  </nz-tab>
</nz-tabset>
<div style="min-height: 25px;">
  <nz-tag *ngFor="let selectedUser of this.selected" nzMode="closeable" (nzOnClose)="removeSelected(selectedUser)" [@fadeInOut]>{{selectedUser.casLogin}}</nz-tag>
</div>
<div style="min-height: 25px;">
  <nz-tag *ngFor="let selectedGroup of this.selectedGroups" nzMode="closeable" (nzOnClose)="removeSelectedGroup(selectedGroup)" [@fadeInOut]>{{selectedGroup}}</nz-tag>
</div>
  `,
  styles: [
  ]
})
export class ShareReportComponent implements OnInit {
  @Input()
  report:ReportMeta
  selected=[]
  selectedGroups=[]
  shareLinkRead;
  shareLinkEdit;
  constructor(public sharingService:SharingService) { }

  ngOnInit(): void {
    setTimeout(()=>{  console.log(this.sharingService.allGroupNames)}, 1000)
    this.sharingService.getReportSharingLink(this.report.id, 'r').subscribe(d=>{
      this.shareLinkRead = `${FRONTEND_URL}/shared/${d['link']}`
    })
    this.sharingService.getReportSharingLink(this.report.id, 'w').subscribe(d=>{
      this.shareLinkEdit = `${FRONTEND_URL}/shared/${d['link']}`
    })

  }

  getEditUrl(){

  }
  stringify(a){
    return JSON.stringify(a)
  }
  removeSelected(selectedUser){
    this.selected = this.selected.filter(d=>d!==selectedUser)
  }
  isElementOnList(elem){
    return this.selected.includes(elem)
  }
  removeSelectedGroup(selectedUser){
    this.selectedGroups = this.selectedGroups.filter(d=>d!==selectedUser)
  }
  isElementOnListGroups(elem){
    return this.selectedGroups.includes(elem)
  }


}
