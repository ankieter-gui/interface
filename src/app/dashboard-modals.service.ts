import {Injectable, ViewContainerRef} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NewReportDialogComponent} from './new-report-dialog/new-report-dialog.component';
import {MockService} from './mock.service';
import {Router} from '@angular/router';
import {ReportsService} from './reports.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardModalsService {

  constructor(private modal: NzModalService, private mockService:MockService, private router:Router, private reports:ReportsService) { }
  createComponentModal(title,component,survey=null, onOk=(i,m)=>null, autocomplete){
    const modal = this.modal.create({
      nzTitle: title,
      nzContent: component,
    //  nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        survey:survey,
        autocompleteSurveys:autocomplete

      },

      nzFooter: [
        {
          label: 'Anuluj',
          onClick: () => modal.destroy()
        },
        {
          label: 'OK',
          type: 'primary',
          onClick:()=> onOk(instance,modal) ,
        },



      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
    return instance;
  }

  openNewReportDialog(survey=null){
   this.createComponentModal("Nowy raport", NewReportDialogComponent, survey,async (i,m)=>{
      const id = await this.reports.createNewReport(i.selectedSurvey.id, i.reportNameInputValue);

     console.log(i.selectedSurvey);
     m.destroy();
      this.router.navigate(['reports/editor', id]);
    }, this.mockService.mockDashboardData.surveys);
  }


}
