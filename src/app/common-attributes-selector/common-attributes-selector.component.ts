import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-common-attributes-selector',
  template: `
    <p style="margin-top:1em">
      <nz-table nzTemplateMode>
        <tr><td>
          <label nz-checkbox [(ngModel)]="this.element.commonAttributes.showId">Pokazywać Id?</label>
        </td>
          <td>
            <label nz-checkbox [(ngModel)]="this.element.commonAttributes.required">Odpowiedź wymagana?</label>
          </td>
        </tr>
      </nz-table>
    </p>
  `,
  styles: [
  ]
})
export class CommonAttributesSelectorComponent implements OnInit {
  @Input() type;
  @Input()
  element:Question
  @Input()
  allowed
  constructor() { }

  ngOnInit(): void {
  }

}
