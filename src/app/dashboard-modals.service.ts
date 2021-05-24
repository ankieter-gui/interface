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

@Injectable({
  providedIn: 'root'
})
export class DashboardModalsService {

  constructor(private modal: NzModalService, private mockService: MockService, private router: Router, private reports: ReportsService, private dashboardService:DashboardService) { }
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
          label: 'OK',
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
     const response = await (this.reports.createNewReport(i.selectedSurvey.id, i.reportNameInputValue).toPromise())
      const id = response['reportId']
     await (this.reports.saveReport(id, new ReportDefinition(i.reportNameInputValue)).toPromise())
     // const id="testoweId"
      console.log(i.selectedSurvey);
      m.destroy();
      await this.router.navigate(['reports/editor', id] );
    } );
  }

  openNewGroupDialog(fromAdminPanel=false): void{
    this.createComponentModal("Nowa grupa", NewGroupDialogComponent, {placeholder: "Szukaj przez nazwisko", fromAdminPanel:fromAdminPanel}, (i: NewGroupDialogComponent, m) => {
      // TODO: create group

      m.destroy();
    } )
  }






}
