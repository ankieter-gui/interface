import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {EditorComponent} from './reports/editor/editor.component';
import {SurveysEditorComponent} from './surveys-editor/surveys-editor.component';
import {GroupsEditorPageComponent} from './groups-editor-page/groups-editor-page.component';
import {LoginGuard} from './LoginGuard';
import {ReportPreviewComponent} from './report-preview/report-preview.component';



const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'groups', component: GroupsEditorPageComponent, canActivate: [LoginGuard] },
  { path: 'reports/editor/:id', component: EditorComponent, canActivate: [LoginGuard]},
  {path: 'surveysEditor', component: SurveysEditorComponent, canActivate: [LoginGuard] },
  {path: 'surveysEditor/:id', component: SurveysEditorComponent, canActivate: [LoginGuard] },
  {path: 'reports/:id', component: ReportPreviewComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
