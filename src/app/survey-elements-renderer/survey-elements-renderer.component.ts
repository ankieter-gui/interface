import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GenericElement, Page, Question, SurveyDefinition} from '../dataModels/SurveyDefinition';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SurveysEditorComponent} from '../surveys-editor/surveys-editor.component';
import {fadeInOut} from '../commonAnimations';

@Component({
  selector: 'app-survey-elements-renderer',
  animations:[fadeInOut],
  template: `
    <div class="report-element" cdkDropList [cdkDropListData]="elements"
         (cdkDropListDropped)="drop($event)">
      <div [@fadeInOut] style="background: #ECECEC;padding:30px;" *ngFor="let element of itemsForCurrentPage(); let i=index" cdkDrag  class="element-box" style="position:relative;">
        <nz-card style="max-width: 900px;"  [nzTitle]="getComponentFromType(element['questionType']).friendlyName +'   '+ element.id" [nzExtra]="extraTemplate">
          <div style="position: relative; padding-left:2em;padding-right:2em;padding-top:0.5em">

            <app-survey-element-host [saveFromEditor]="saveFromEditor" [survey]="survey" [componentConfig]="getComponentFromType(element['questionType'])" [element]="element" (save)="saveFun()" [showConditions]="showConditions"></app-survey-element-host>

          </div>
        </nz-card>
        <ng-template #extraTemplate>
          <div>
            <button mat-icon-button cdkDragHandle [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
              <mat-icon>open_with</mat-icon>
            </button>

            <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="removeElement(element)">
                <mat-icon>delete</mat-icon>
                <span>Usuń</span>
              </button>
              <div *ngIf="element.questionType!='page'">
                  <span>Przerzuć na inną stronę</span>
                <div style="padding:1em;"><nz-tag style="cursor: pointer" *ngFor="let page of allPages" (click)="moveToPage(element,page)">{{page.id}}</nz-tag></div>
              </div>
            </mat-menu>
          </div>
        </ng-template>
      </div>




    </div>
  `,
  styles: [
    `
      .element-box{
        margin-top:1em;


      }
      .element-box:hover{

      }`
  ]
})
export class SurveyElementsRendererComponent implements OnInit {
  selectedPage
  @Input() saveFromEditor;
  @Input() showConditions=true;
  saveFun(){
    console.log("Save emitter in renderer")
    console.log(this.elements)
    this.save.emit()
  }
  @Output() save= new EventEmitter();
  @Output() remove= new EventEmitter();
  @Input() survey:SurveyDefinition;
  @Input() elements:GenericElement[];
  constructor() { }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.elements, event.previousIndex, event.currentIndex);
  }

  itemsForCurrentPage(){
    return this.elements
  }
  ngOnInit(): void {
    console.log(this.saveFromEditor)
  }
  getComponentFromType(type){
    return SurveysEditorComponent.surveyComponents[type]
  }
  removeElement(element){
    this.remove.emit(element)
    this.saveFun()
  }
  get allPages(){
    return this.survey.elements.filter((x:any)=>x.questionType=='page' && x.elements!=this.elements)
  }
  moveToPage(element,page:Page){

    if (this.elements!=page.elements){
    page.elements.push(element)
    this.removeElement(element)}
    this.saveFun()
  }
}
