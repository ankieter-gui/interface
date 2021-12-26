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
<div *ngIf="this.sharingService._usersBeingDownloaded">
  <nz-spin></nz-spin>
</div>
<div *ngIf="!this.sharingService._usersBeingDownloaded">
    <div class="input-with-label"><span class="label">Link do poglądu</span><input nz-input [value]="this.shareLinkRead"></div>
    <div class="input-with-label"><span class="label">Link do edycji</span><input nz-input [value]="this.shareLinkEdit"></div>
    <div>
      <p><b>Dostęp mają już:</b></p>
      <nz-tag *ngFor="let userId of whoHasAccess" nzMode="closeable" (nzOnClose)="removeUserWithAccess(userId)"> {{this.sharingService.groupOrUserName(userId)}} - {{this.sharingService.permissionName(this.report.sharedTo[userId])}}</nz-tag>
    </div>
<nz-tabset>
  <nz-tab nzTitle="Użytkownicy">
<!--<nz-divider nzText="Indywidualni użytkownicy"></nz-divider>-->


        <input nz-input placeholder="Wyszukaj..." [(ngModel)]="usersSearchString">

        <nz-table #basicTable [nzData]="this.sharingService.users() | filterByField: 'casLogin': usersSearchString " nzShowPagination [nzPageSize]="4">
          <thead>
          <tr>
            <th>Nazwa</th>
<!--            <th>Age</th>-->
<!--            <th>Address</th>-->
            <th>Właściciel</th>
            <th>Edycja</th>
            <th>Pogląd</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let data of basicTable.data">
            <td>{{data.casLogin}}</td>
<!--            <td>{{data.age}}</td>-->
<!--            <td>{{data.address}}</td>-->
            <td>

              <nz-divider nzType="vertical"></nz-divider>
              <a (click)="addToList('o', data)" *ngIf="!isElementOnList('o',data)" [@fadeInOut]>Dodaj</a>
              <a (click)="removeSelected('o',data)" *ngIf="isElementOnList('o', data)" [@fadeInOut]>Usuń</a>
            </td>
            <td>

              <nz-divider nzType="vertical"></nz-divider>
              <a (click)="addToList('w', data)" *ngIf="!isElementOnList('w',data)" [@fadeInOut]>Dodaj</a>
              <a (click)="removeSelected('w',data)" *ngIf="isElementOnList('w', data)" [@fadeInOut]>Usuń</a>
            </td>
            <td>

              <nz-divider nzType="vertical"></nz-divider>
              <a (click)="addToList('r', data)" *ngIf="!isElementOnList('r',data)" [@fadeInOut]>Dodaj</a>
              <a (click)="removeSelected('r',data)" *ngIf="isElementOnList('r', data)" [@fadeInOut]>Usuń</a>
            </td>
          </tr>
          </tbody>
        </nz-table>

  </nz-tab>
  <nz-tab nzTitle="Grupy">
<!--<nz-divider nzText="Grupy"></nz-divider>-->


    <input nz-input placeholder="Wyszukaj..." [(ngModel)]="groupSearchString">

    <nz-table #basicTable2 [nzData]="this.sharingService.allGroupNames | filterString: groupSearchString" nzShowPagination [nzPageSize]="4">
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
<!--  <nz-tab nzTitle="Użytkownicy (wybierz przez grupy)">-->
<!--    <nz-collapse style="margin-top:1.5em">-->
<!--      <nz-collapse-panel *ngFor="let groupName of this.sharingService.allGroupNames | filterString: ''" [nzHeader]="groupName + ' ('+sharingService.allGroups[groupName].length+')' | titlecase">-->
<!--        <nz-list>-->
<!--          <nz-list-item *ngFor="let user of sharingService.allGroups[groupName]">-->
<!--            <span nz-typography>{{user.casLogin}}</span>-->
<!--            <ul nz-list-item-actions>-->
<!--              <nz-list-item-action> <a (click)="selected.push(user)" *ngIf="!isElementOnList(user)" [@fadeInOut]>Dodaj</a>-->
<!--                <a (click)="removeSelected(user)" *ngIf="isElementOnList(user)" [@fadeInOut]>Usuń</a></nz-list-item-action>-->

<!--            </ul>-->
<!--          </nz-list-item>-->

<!--        </nz-list>-->
<!--      </nz-collapse-panel>-->
<!--    </nz-collapse>-->
<!--  </nz-tab>-->
</nz-tabset>
<div style="min-height: 25px;">
  <div *ngFor="let key of this.selectedKeys">
    <div *ngIf="this.selected[key]&&this.selected[key].length>0">
    <span><b>{{this.sharingService.permissionName(key)}}</b></span><br>
  <nz-tag *ngFor="let selectedUser of this.selected[key]" nzMode="closeable" (nzOnClose)="removeSelected(key,selectedUser)" [@fadeInOut]>{{selectedUser.casLogin}}</nz-tag>
  </div>
  </div>
  </div>
<div style="min-height: 25px;">
  <div *ngIf="this.selectedGroups&&this.selectedGroups.length>0">
  <span><b>Grupy odczyt:</b></span><br>
  <nz-tag *ngFor="let selectedGroup of this.selectedGroups" nzMode="closeable" (nzOnClose)="removeSelectedGroup(selectedGroup)" [@fadeInOut]>{{selectedGroup}}</nz-tag>
</div>
</div>
</div>
  `,
  styles: [
  ]
})
export class ShareReportComponent implements OnInit {
  @Input()
  type
  @Input()
  report:ReportMeta
  get selectedKeys(){
    return Object.keys(this.selected)
  }
  selected={
    o:[],
    w:[],
    r:[],
    n:[],
  }
  selectedGroups=[]
  usersSearchString;
  groupSearchString;
  shareLinkRead;
  shareLinkEdit;
  constructor(public sharingService:SharingService) { }

  ngOnInit(): void {
    setTimeout(()=>{  console.log(this.sharingService.allGroupNames)}, 1000)
    console.log(this.type)
    if (this.type=="report"){
    this.sharingService.getReportSharingLink(this.report.id, 'r').subscribe(d=>{
      this.shareLinkRead = `${FRONTEND_URL}/shared/${d['link']}`
    })
    this.sharingService.getReportSharingLink(this.report.id, 'w').subscribe(d=>{
      this.shareLinkEdit = `${FRONTEND_URL}/shared/${d['link']}`
    })}
    else if (this.type=="survey"){
      this.sharingService.getSurveySharingLink(this.report.id, 'r').subscribe(d=>{
        this.shareLinkRead = `${FRONTEND_URL}/shared/${d['link']}`
      })
      this.sharingService.getSurveySharingLink(this.report.id, 'w').subscribe(d=>{
        this.shareLinkEdit = `${FRONTEND_URL}/shared/${d['link']}`
      })}

  }

  getEditUrl(){

  }
  addToList(group, element){
     Object.entries(this.selected).forEach(u=>{
       const key=u[0]
       const value = u[1]
       this.selected[key] = value.filter(d=>d!==element)
     })
    this.selected[group].push(element)
  }
  stringify(a){
    return JSON.stringify(a)
  }
  get whoHasAccess(){
    return Object.keys(this.report.sharedTo)
  }
  removeSelected(key, selectedUser){
    this.selected[key] = this.selected[key].filter(d=>d!==selectedUser)
  }
  async removeUserWithAccess(id){

    let rsp = await this.sharingService.removePermission(this.report.type, id,this.report.id).toPromise()
    if (rsp['error']){
      alert("Błąd przy usuwaniu");return;
    }
    delete this.report.sharedTo[id]
  }
  isElementOnList(key,elem){
    return this.selected[key].includes(elem)
  }
  removeSelectedGroup(selectedUser){
    this.selectedGroups = this.selectedGroups.filter(d=>d!==selectedUser)
  }
  isElementOnListGroups(elem){
    return this.selectedGroups.includes(elem)
  }


}
