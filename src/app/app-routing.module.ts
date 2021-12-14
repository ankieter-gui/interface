import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {EditorComponent} from './reports/editor/editor.component';
import {SurveysEditorComponent} from './surveys-editor/surveys-editor.component';
import {GroupsEditorPageComponent} from './groups-editor-page/groups-editor-page.component';
import {LoginGuard, OnlyAdminGuard} from './LoginGuard';
import {ReportPreviewComponent} from './report-preview/report-preview.component';
import {LinkActivatorComponent} from './link-activator/link-activator.component';
import {AccountNotExistsComponent} from './account-not-exists/account-not-exists.component';
import {LoginPanelComponent} from './login-panel/login-panel.component';




const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'groups', component: GroupsEditorPageComponent, canActivate: [OnlyAdminGuard] },
  { path: 'reports/editor/:id', component: EditorComponent, canActivate: [LoginGuard]},

  {path: 'surveysEditor/:id', component: SurveysEditorComponent, canActivate: [LoginGuard] },
  {path: 'reports/:id', component: ReportPreviewComponent },
  {path: 'shared/:hash', component: LinkActivatorComponent },
  {path: 'unauthorized', component: AccountNotExistsComponent },
  {path:"login", component: LoginPanelComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
