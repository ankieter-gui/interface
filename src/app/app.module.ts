import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

import {NgxEchartsModule} from 'ngx-echarts';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import { SurveyTileComponent } from './survey-tile/survey-tile.component';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import { SurveySparklineChartComponent } from './survey-sparkline-chart/survey-sparkline-chart.component';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { ReportTileComponent } from './report-tile/report-tile.component';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzAffixModule} from 'ng-zorro-antd/affix';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputModule} from 'ng-zorro-antd/input';


registerLocaleData(fr);
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SurveyTileComponent,
    SurveySparklineChartComponent,
    ReportTileComponent,

  ],
  imports: [
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzAvatarModule,
    AppRoutingModule,
    NzAffixModule,
    NzMenuModule,
    NzSelectModule,
    NzStatisticModule,
    NzAutocompleteModule,
    NzTagModule,
    NzProgressModule,
    FormsModule,
    HttpClientModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
