export class GenericElement{

}
export class CommonAttributes{
  constructor() {
    this.showId=false;
    this.defaultValue=undefined;
    this.tip=undefined;
    this.overrideDefaultValue=false;
    this.required=false;
    this.orientation="horizontal"
    this.showTip=false;
    this.collapsed=false;
    this.rotate=undefined
    this.showTextField=false;
    this.naLabel=false;
  }
  static getFriendlyName(name){
    const u = {

    }
    return name;
  }
  showId?:boolean=false;
  defaultValue?:string
  tip?:string
  showTip=false;
  required?:boolean
  overrideDefaultValue=false;
  orientation?:"horizontal"|"vertical"
  collapsed?:boolean
  rotate?
  showTextField?:boolean
  naLabel?
  id_prev?
}
export class Question extends GenericElement{
  static questionType;
  header="";
  commonAttributes?:CommonAttributes;
  constructor() {
    super();
    this.commonAttributes=new CommonAttributes()
  }

}
export class Information extends  Question{
  static questionType='information';
  static allowedAttrs=[]
}
export class TextQuestion extends  Question{
  static questionType="text"
  static allowedAttrs=['showId','defaultValue', "required", "orientation", "collapsed", "rotate", "showTextField", "naLabel"]

  maxLength=250;
  constructor() {
    super()
  }
}
export class Choice{
  code:string="";
  value:string="";
  rotate?:boolean=false;
}
export class GroupedQuestion{
  code:string="";
  value:string="";
  rotate?:boolean=false;
}
export class SingleChoiceQuestion extends Question{
  static allowedAttrs=['showId','defaultValue', "required", "orientation", "collapsed", "rotate", "showTextField", "naLabel"]
  static questionType="single"
  questionType = "single"
  options:Choice[]=[]
  constructor() {
    super()
  }
}
export class GroupedSingleChoiceQuestion extends Question{
  static allowedAttrs=['showId','defaultValue', "required", "orientation", "collapsed", "rotate", "showTextField", "naLabel"]
  static questionType="groupedsingle"
  questionType = "groupedsingle"
  options:Choice[]=[]
  questions:GroupedQuestion[]=[]
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
  constructor() {
    super();
  }
}

export class SurveyDefinition{
  elements:GenericElement[]=[]
  title:string="";
  constructor() {
  }

}
