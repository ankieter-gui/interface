export class DeclarationAttributes{
  version:string="1.0"
  encoding:string="utf-8"
}
export class GenericElement{
  //type:string;
  //elements?:GenericElement[]
  //content?:string
}
export class CommonAttributes{
  showId?:boolean
  defaultValue?:string
  required?:boolean
  orientation?:"horizontal"|"vertical"
  collapsed?:boolean
  rotate?
  showTextField?:boolean
  naLabel?
  id_prev?
}
export class Question extends GenericElement{
  header;
  id;

  commonAttributes?
  constructor(header) {
    super();
    this.header=header
  }
  questionType;
}
export class TextQuestion extends  Question{
  questionType="text"
  maxLength=250;
  constructor(header) {
    super(header);
  }
}
export class SingleChoiceQuestion extends Question{
  questionType="single"
  options:string[]=[]
  constructor(header, options:string[]=[]) {
    super(header);
    this.options=options
  }
}
export class MultipleChoiceQuestion extends Question{
  questionType="multi"
  options:string[]=[]
  range?:boolean=false
  maxAnswers=3
  minAnswers=1
  blocking?:boolean=false;
  showAutoTip?:boolean=false;
  constructor(header, options:string[]=[]) {
    super(header);
    this.options=options
  }
}
export class ScaleQuestion extends Question{
  questionType="scale"
  options:{value?:string, code:number}[]=[]
  constructor(header, options:{value?:string, code:number}[]=[]) {
    super(header);
    this.options=options
  }
}
export class TitleElement extends GenericElement{
  text:string;
}
export class QuestionnaireRoot extends  GenericElement{
  elements:Question[] = []
 }
export class SurveyDefinition{
  root:QuestionnaireRoot=new QuestionnaireRoot()
  title:string;
  get questions():Question[]{
    return this.root.elements
  }
}
