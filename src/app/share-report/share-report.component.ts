import {Component, Input, OnInit} from '@angular/core';
import {ReportMeta} from '../dataModels/survey';
import {SharingService} from '../sharing.service';
import {fadeInOut} from '../commonAnimations'
@Component({
  animations:[fadeInOut],
  selector: 'app-share-report',
  template: `
<!--    <div class="header">Udostępnij raport: {{this.report.name}}</div>-->
    <div class="input-with-label"><span class="label">Link do poglądu</span><input nz-input [value]="getPublicUrl()"></div>
    <div class="input-with-label"><span class="label">Link do edycji</span><input nz-input [value]="getEditUrl()"></div>
<nz-divider nzText="Indywidualni użytkownicy"></nz-divider>
<div style="min-height: 25px;">
<nz-tag *ngFor="let selectedUser of this.selected" nzMode="closeable" (nzOnClose)="removeSelected(selectedUser)" [@fadeInOut]>{{selectedUser.CasLogin}}</nz-tag>
</div>
    <nz-collapse style="margin-top:1em;">
      <nz-collapse-panel nzHeader="Rozwiń">
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
            <td>{{data.CasLogin}}</td>
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

      </nz-collapse-panel>
    </nz-collapse>
<nz-divider nzText="Grupy"></nz-divider>
  `,
  styles: [
  ]
})
export class ShareReportComponent implements OnInit {
  @Input()
  report:ReportMeta
  selected=[]
  constructor(public sharingService:SharingService) { }

  ngOnInit(): void {
  }
  getPublicUrl(){
    return "http://localhost:4200/reports/"+this.report.id
  }
  getEditUrl(){

  }
  removeSelected(selectedUser){
    this.selected = this.selected.filter(d=>d!==selectedUser)
  }
  isElementOnList(elem){
    return this.selected.includes(elem)
  }

}
