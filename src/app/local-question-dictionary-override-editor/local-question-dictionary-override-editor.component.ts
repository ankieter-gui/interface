import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalFilter, ReportDefinition} from '../dataModels/ReportDefinition';
import {ChartReportElement} from '../dataModels/ReportElement';
import {ChartsService} from '../charts.service';
import {ReportsService} from '../reports.service';

@Component({
  selector: 'app-local-question-dictionary-override-editor',
  template: `
    <section>
      <input nz-input [(ngModel)]="searchString" placeholder="Szukaj..." style="margin-bottom: 1em">
      <div style="overflow-y: scroll;" [style.maxHeight]="this.maxHeight">
        <nz-table
          [nzTemplateMode]="true">
          <thead style="white-space: nowrap;">
          <tr>
            <th style="white-space: nowrap; background:transparent!important;">Oryginalna etykieta</th>
            <th style="white-space: nowrap; background:transparent!important;">Nowa etykieta</th>
          </tr>
          </thead>
          <tbody>
          <tr style="line-height: 1.428!important;" *ngFor="let row of this.uniqueKeys|filterByField:0:searchString">
            <td style="width: 50%;">{{row[0]}}</td>
            <td><input nz-input [(ngModel)]="row[1]" placeholder="Nowa etykieta..." (blur)="updateLocalDict(row)"></td>
          </tr>
          </tbody>
        </nz-table>
      </div>
    </section>
  `,
  styleUrls: ['./local-question-dictionary-override-editor.component.css']
})
export class LocalQuestionDictionaryOverrideEditorComponent implements OnInit {
  @Output()
  dataChanged = new EventEmitter<GlobalFilter>();
  searchString;
  @Input()
  maxHeight;
  @Input()
  report: ReportDefinition;
  @Input()
  chart: ChartReportElement;
  @Input()
  dictionary;
  uniqueKeys = [];
  generator;

  constructor(private chartService: ChartsService, private reportService: ReportsService) {
  }

  ngOnInit(): void {
    this.generator = this.chartService.getGenerator([], this.chart, this.dictionary, this.reportService, this.report.dictionaryOverrides, this.chart.config.localLabelOverrides);
    //TODO: to będzie ciężkie a mało potrzebne
    //get labels from all questions and all groups
    //
    // let keys = this.dictionary[this.chart].map(d => Object.values(d)).flat();
    // console.log(keys);
    // keys = [...new Set(keys)];
    // this.uniqueKeys = keys.map(d => [d, '']);
    // console.log(this.uniqueKeys)
  }

  updateLocalDict(row) {
    if (!this.chart.config.localLabelOverrides) {
      this.chart.config.localLabelOverrides = {};
    }
    if (row[1] || Object.keys(this.chart.config.localLabelOverrides).includes(row[0])) {
      this.chart.config.localLabelOverrides[row[0]] = row[1];
      this.dataChanged.emit();
    }
  }
}
