
export class GenericElement{

}
export class CommonAttributes{
  showId?:boolean=false;
  defaultValue?:string
  tip?:string
  required?:boolean
  orientation?:"horizontal"|"vertical"
  collapsed?:boolean
  rotate?
  showTextField?:boolean
  naLabel?
  id_prev?
}
export class Question extends GenericElement{
  static questionType;
  header;
  commonAttributes?
  constructor() {
    super();
  }

}
export class TextQuestion extends  Question{
  static questionType="text"
  maxLength=250;
  constructor() {
    super()
  }
}
export class Choice{
  code:string="";
  value:string;
}
export class SingleChoiceQuestion extends Question{
  allowedAttrs=['showId','defaultValue', "required", "orientation", "collapsed", "rotate", "showTextField", "naLabel"]
  questionType="single"
  options:Choice[]=[]
  constructor() {
    super()
  }
}
export class MultipleChoiceQuestion extends Question{
  questionType="multi"
  options:Choice[]=[]
  range?:boolean=false
  maxAnswers=1
  minAnswers=1
  blocking?:boolean=false;
  showAutoTip?:boolean=false;
  constructor() {
    super()
  }
}
export class ScaleQuestion extends Question{
  questionType="scale"
  options:Choice[]=[]
  constructor() {
    super()
  }
}
export class TitleElement extends GenericElement{
  text:string;
}

export class SurveyDefinition{
  elements:GenericElement[]=[]
  title:string="";
  constructor() {
  }

}
