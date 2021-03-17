import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {EditorComponent} from './reports/editor/editor.component';
import {SurveysEditorComponent} from './surveys-editor/surveys-editor.component';



const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'reports/editor/:id', component: EditorComponent},
  {path: 'surveysEditor', component: SurveysEditorComponent },
  {path: 'surveysEditor/:id', component: SurveysEditorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
