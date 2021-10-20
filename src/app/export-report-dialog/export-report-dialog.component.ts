import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-export-report-dialog',
  template: `
    <p>Poniższy kod nie zawiera żadnych danych z wyników ankiet. Użyte są tylko wartości podane z .xml</p>
    <textarea>
      {{content}}
    </textarea>
  `,
  styles: []
})
export class ExportReportDialogComponent implements OnInit {
  @Input()
  content;

  constructor() {
  }

  ngOnInit(): void {
  }

}
