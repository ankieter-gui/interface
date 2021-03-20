import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditorComponent} from './editor/editor.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {AppModule, commonNZImports} from '../app.module';

import {MatInputModule} from '@angular/material/input';
import {ChartEditorViewComponent} from './chart-editor-view/chart-editor-view.component';


@NgModule({
  declarations: [EditorComponent, ChartEditorViewComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ...commonNZImports
    // ...commonNZImports,
  ]
})
export class ReportsModule { }
