import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditorComponent} from './editor/editor.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {AppModule, commonNZImports} from '../app.module';


@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    ...commonNZImports
    // ...commonNZImports,
  ]
})
export class ReportsModule { }
