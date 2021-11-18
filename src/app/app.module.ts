import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

import {NgxEchartsModule} from 'ngx-echarts';

import {NZ_I18N, pl_PL} from 'ng-zorro-antd/i18n';

import {registerLocaleData} from '@angular/common';
import pl from '@angular/common/locales/pl';
import {FormsModule} from '@angular/forms';
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
import {
  FilterByEquality,
  FilterByFieldPipe, FilterByInequality,
  FilterByNamePipe,
  FilterByTypePipe, FilterDictPipe, FilterStringPipe,
  NameFilter,
  PolskieNazwyFilter,
  RemoveHtmlFilter
} from './filter-by-name.pipe';
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
import {LoginGuard, OnlyAdminGuard} from './LoginGuard';
import { UserIndicatorComponent } from './user-indicator/user-indicator.component';
import { ReportPreviewComponent } from './report-preview/report-preview.component';
import { ShareReportComponent } from './share-report/share-report.component';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {SurveysEditorComponent} from './surveys-editor/surveys-editor.component';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import { LinkActivatorComponent } from './link-activator/link-activator.component';
import {AddNewUserComponent} from './add-new-user/add-new-user.component';
import {LoginPanelComponent} from './login-panel/login-panel.component';
import {FiltersSelectorComponent} from './filters-selector/filters-selector.component';
import {LineChartCustomDataPickerComponent} from './line-chart-custom-data-picker/line-chart-custom-data-picker.component';
import {NewSurveyDialogComponent} from './new-survey-dialog/new-survey-dialog.component';
import {AccountNotExistsComponent} from './account-not-exists/account-not-exists.component';
import {GroupedBarsPercentageDataPickerComponent} from './grouped-bars-percentage-data-picker/grouped-bars-percentage-data-picker.component';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {DeleteConfirmModalComponent} from './delete-confirm-modal/delete-confirm-modal.component';
import {DummyChartComponent} from './dummy-chart/dummy-chart.component';
import {EscapeHtmlPipe} from './keep-html.pipe';
import {GlobalDictionaryOverrideEditorComponent} from './global-dictionary-override-editor/global-dictionary-override-editor.component';
import {LocalQuestionDictionaryOverrideEditorComponent} from './local-question-dictionary-override-editor/local-question-dictionary-override-editor.component';
import {IgnoreSelectorComponent} from './ignore-selector/ignore-selector.component';
import {ColorsAndOrderSelectorComponent} from './colors-and-order-selector/colors-and-order-selector.component';
import {CommonColorPickerComponent} from './common-color-picker/common-color-picker.component';
import {MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS, NgxMatColorPickerModule} from '@angular-material-components/color-picker';
import {InViewportModule} from '@thisissoon/angular-inviewport';
import {ExportReportDialogComponent} from './export-report-dialog/export-report-dialog.component';
import {ReorderDialogComponent} from './reorder-dialog/reorder-dialog.component';
import { SimpleColorSelectorComponent } from './simple-color-selector/simple-color-selector.component';
import { GroupSummaryPickerComponent } from './group-summary-picker/group-summary-picker.component';
import { QuestionGroupEditorComponent } from './question-group-editor/question-group-editor.component';
import { MultipleBarsWithCustomDataDataPickerComponent } from './multiple-bars-with-custom-data-data-picker/multiple-bars-with-custom-data-data-picker.component';
import {MatTooltipModule} from '@angular/material/tooltip';

// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import bar charts, all with Chart suffix
import { BarChart } from 'echarts/charts';
import {TitleComponent, TooltipComponent, GridComponent, LegendComponent} from 'echarts/components';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { SVGRenderer} from 'echarts/renderers';


echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, SVGRenderer, LegendComponent]);
registerLocaleData(pl);
export let commonNZImports = [
  // NgxEchartsModule.forRoot({
  //   /**
  //    * This will import all modules from echarts.
  //    * If you only need custom modules,
  //    * please refer to [Custom Build] section.
  //    */
  //   echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
  // }),
  NgxEchartsModule.forRoot({ echarts }),
  BrowserModule,

  NzLayoutModule,
  NzBreadCrumbModule,
  NzCardModule,
  NzAvatarModule,
  NgxMatColorPickerModule,
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
  NzMessageModule,
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
    EscapeHtmlPipe,
    DashboardComponent,
    SurveyTileComponent,
    FilterByFieldPipe,
    FilterByEquality,
    FilterByInequality,
    FilterStringPipe,
    ReportTileComponent,
    NewReportDialogComponent,
    FilterByNamePipe,

    GlobalSidemenuComponent,
    //TODO: lazy loading issue #4
    EditorComponent,
    TextEditorViewComponent,
    ChartEditorViewComponent,
    GroupsEditorComponent,
    GroupsEditorPageComponent,

    NewGroupDialogComponent,
    UserSearchComboboxComponent,
    NameFilter,
    RemoveHtmlFilter,
    PolskieNazwyFilter,
    FilterByTypePipe,
    UserIndicatorComponent,
    ReportPreviewComponent,
    ShareReportComponent,
    FilterDictPipe,
    SurveysEditorComponent,

    LinkActivatorComponent,

    AddNewUserComponent,

    LoginPanelComponent,

    FiltersSelectorComponent,

    LineChartCustomDataPickerComponent,

    NewSurveyDialogComponent,

    AccountNotExistsComponent,

    GroupedBarsPercentageDataPickerComponent,

    DeleteConfirmModalComponent,

    DummyChartComponent,

    GlobalDictionaryOverrideEditorComponent,


    LocalQuestionDictionaryOverrideEditorComponent,

    IgnoreSelectorComponent,

    ColorsAndOrderSelectorComponent,

    CommonColorPickerComponent,

    ExportReportDialogComponent,

    ReorderDialogComponent,

    SimpleColorSelectorComponent,

    GroupSummaryPickerComponent,

    QuestionGroupEditorComponent,

    MultipleBarsWithCustomDataDataPickerComponent,

  ],
  imports: [
    BrowserAnimationsModule,
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
    InViewportModule,
    NzPaginationModule,
    NzDropDownModule,
    NzRadioModule,
    NzAlertModule,
    MatTooltipModule

  ],
  providers: [
    {provide: NZ_I18N, useValue: pl_PL},
    {provide: Window, useValue: window},
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS}
    , LoginGuard, OnlyAdminGuard],
  exports: [
    GlobalSidemenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
