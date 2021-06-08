import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

import {NgxEchartsModule} from 'ngx-echarts';

import {NZ_I18N, pl_PL} from 'ng-zorro-antd/i18n';
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

import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { ReportTileComponent } from './report-tile/report-tile.component';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzAffixModule} from 'ng-zorro-antd/affix';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import { NewReportDialogComponent } from './new-report-dialog/new-report-dialog.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {FilterByNamePipe, FilterByTypePipe, NameFilter, PolskieNazwyFilter, RemoveHtmlFilter} from './filter-by-name.pipe';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { GlobalSidemenuComponent } from './global-sidemenu/global-sidemenu.component';
import {EditorComponent} from './reports/editor/editor.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ChartEditorViewComponent} from './reports/chart-editor-view/chart-editor-view.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CKEditorModule} from 'ckeditor4-angular';
import {ReportsModule} from './reports/reports.module';
import {TextEditorViewComponent} from './reports/text-editor-view/text-editor-view.component';
import {MatIconModule} from '@angular/material/icon';
import { GroupsEditorComponent } from './groups-editor/groups-editor.component';
import { GroupsEditorPageComponent } from './groups-editor-page/groups-editor-page.component';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzListModule} from 'ng-zorro-antd/list';
import { CreateNewGroupComponent } from './create-new-group/create-new-group.component';
import { NewGroupDialogComponent } from './new-group-dialog/new-group-dialog.component';
import { UserSearchComboboxComponent } from './user-search-combobox/user-search-combobox.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzTableModule} from 'ng-zorro-antd/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {LoginGuard} from './LoginGuard';
import { UserIndicatorComponent } from './user-indicator/user-indicator.component';
import { ReportPreviewComponent } from './report-preview/report-preview.component';
import { ShareReportComponent } from './share-report/share-report.component';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {SurveysEditorComponent} from './surveys-editor/surveys-editor.component';


registerLocaleData(fr);
export let commonNZImports = [
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
  NzModalModule,
  NzTableModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  FormsModule,
  HttpClientModule,
  NzIconModule,
  NzButtonModule,
  NzInputModule,
  //TODO: lazy loading issue #5

  NzToolTipModule,
  NzGridModule,
]
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SurveyTileComponent,

    ReportTileComponent,
    NewReportDialogComponent,
    FilterByNamePipe,
    ShareDialogComponent,
    GlobalSidemenuComponent,
    //TODO: lazy loading issue #4
    EditorComponent,
    TextEditorViewComponent,
    ChartEditorViewComponent,
    GroupsEditorComponent,
    GroupsEditorPageComponent,
    CreateNewGroupComponent,
    NewGroupDialogComponent,
    UserSearchComboboxComponent,
    NameFilter,
    RemoveHtmlFilter,
    PolskieNazwyFilter,
    FilterByTypePipe,
    UserIndicatorComponent,
    ReportPreviewComponent,
    ShareReportComponent,

    SurveysEditorComponent
  ],
  imports: [
    ...commonNZImports,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    ReportsModule,
    CKEditorModule,
    MatIconModule,
    NzCollapseModule,
    NzListModule,
    NgxFileDropModule,
    NzBadgeModule,
    NzTabsModule,
    NzCheckboxModule,
    NzSpinModule,
    NzDividerModule,
    NzPaginationModule

  ],
  providers: [{provide: NZ_I18N, useValue: fr_FR},  { provide: Window, useValue: window },LoginGuard],
  exports: [
    GlobalSidemenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
