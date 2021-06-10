import {Injectable, ViewContainerRef} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NewReportDialogComponent} from './new-report-dialog/new-report-dialog.component';
import {MockService} from './mock.service';
import {Router} from '@angular/router';
import {ReportsService} from './reports.service';
import {NewGroupDialogComponent} from './new-group-dialog/new-group-dialog.component';
import {from} from 'rxjs';
import {DashboardService} from './dashboard.service';
import {ReportDefinition} from './dataModels/ReportDefinition';
import {ShareReportComponent} from './share-report/share-report.component';
import {ReportMeta} from './dataModels/survey';
import {FileSystemFileEntry} from 'ngx-file-drop';
import {SharingService} from './sharing.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardModalsService {

  constructor(private modal: NzModalService, private mockService: MockService, private router: Router, private reports: ReportsService,private sharing:SharingService, private dashboardService:DashboardService) { }
  createComponentModal(title, component, params, onOk= (instance, modal) => null): void{
    const modal = this.modal.create({
      nzTitle: title,
      nzContent: component,
    //  nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: params,

      nzFooter: [
        {
          label: 'Anuluj',
          onClick: () => modal.destroy()
        },
        {
          label: params.okText??'OK',
          type: 'primary',
          onClick: () => onOk(instance, modal) ,
        },



      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
    return instance;
  }

  async openNewReportDialog(survey= null){
   this.createComponentModal("Nowy raport", NewReportDialogComponent, {
     survey,
     autocompleteSurveys: (await (this.dashboardService.getDashobardData().toPromise())).objects.filter(d=>d.type==="survey")

   }, async (i, m) => {
     let selectedSurvey = null;
     selectedSurvey=i.selectedSurvey
     if (i.files.length>0) {
       console.log("1")
       i.isFileBeingUploaded = true;
       console.log("1")

       console.log("1")
       console.log(i.fileEntry)

       i.fileEntry.file(async (file: File) => {
         console.log("1")
         // Here you can access the real file
         console.log(i.files[0].relativePath, file);
         let d = await (i.surveyService.uploadData(file, i.files[0].relativePath).toPromise())
         i.isFileBeingUploaded = false;
           selectedSurvey = d

         const response = await (this.reports.createNewReport(selectedSurvey.id, i.reportNameInputValue).toPromise())
         const id = response['reportId']
         await (this.reports.saveReport(id, new ReportDefinition(i.reportNameInputValue)).toPromise())
         // const id="testoweId"
         console.log(selectedSurvey);
         m.destroy();
         await this.router.navigate(['reports/editor', id] );

       });
     }else{
       const response = await (this.reports.createNewReport(selectedSurvey.id, i.reportNameInputValue).toPromise())
       const id = response['reportId']
       await (this.reports.saveReport(id, new ReportDefinition(i.reportNameInputValue)).toPromise())
       // const id="testoweId"
       console.log(selectedSurvey);
       m.destroy();
       await this.router.navigate(['reports/editor', id] );
     }


    } );
  }
  async openShareReportDialog(report:ReportMeta){
    this.createComponentModal("Udostępnij raport", ShareReportComponent, {report:report, okText:"Udostępnij"}, async (i:ShareReportComponent,m)=>{
      console.log(i.selected)
      console.log(i.selectedGroups)
      await this.sharing.shareReportToUsers(i.report.id, [], i.selected.map(d=>d.id), []).toPromise()
        await this.sharing.shareReportToGroups(i.report.id, [], i.selectedGroups, []).toPromise()
        m.destroy()
    })
  }
  openNewGroupDialog(fromAdminPanel=false): void{
    this.createComponentModal("Nowa grupa", NewGroupDialogComponent, {placeholder: "Szukaj przez nazwisko", fromAdminPanel:fromAdminPanel}, async (i: NewGroupDialogComponent, m) => {
      // TODO: create group
      i.updating=true;
      await this.sharing.updateGroup(i.groupName, i.selected.map(d=>d.id)).toPromise()
      await this.sharing.downloadAllGroups()
      m.destroy();
    } )
  }






}
