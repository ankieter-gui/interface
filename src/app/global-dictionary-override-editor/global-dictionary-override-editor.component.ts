import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalFilter, ReportDefinition} from '../dataModels/ReportDefinition';

@Component({
  selector: 'app-global-dictionary-override-editor',
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
            <td><input nz-input [(ngModel)]="row[1]" placeholder="Nowa etykieta..." (blur)="updateDict(row)"></td>
          </tr>
          </tbody>
        </nz-table>
      </div>
    </section>
  `,
  styleUrls: ['./global-dictionary-override-editor.component.css']
})
export class GlobalDictionaryOverrideEditorComponent implements OnInit {
  @Output()
  dataChanged = new EventEmitter<GlobalFilter>();
  searchString;
  @Input()
  maxHeight;
  @Input()
  report: ReportDefinition;
  @Input()
  dictionary;
  uniqueKeys = [];

  constructor() {
  }

  updateDict(row) {
    if (!this.report.dictionaryOverrides) {
      this.report.dictionaryOverrides = {};
    }
    if (row[1] || Object.keys(this.report.dictionaryOverrides).includes(row[0])) {
      this.report.dictionaryOverrides[row[0]] = row[1];
      this.dataChanged.emit();
    }

  }

  ngOnInit(): void {
    let keys = Object.values(this.dictionary).map(d => Object.values(d)).flat();
    keys = [...new Set(keys)];
    this.uniqueKeys = keys.map(d => [d, '']);

  }

}
