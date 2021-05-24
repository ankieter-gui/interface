import { Pipe, PipeTransform } from '@angular/core';
import {SurveyQueryNamingDictionary} from './dataModels/Query';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }


    return items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
  }

}

@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }


    return items.filter(item => item.type.toLowerCase().includes(filter.toLowerCase()));
  }

}


@Pipe({
  name: 'NameFilter'
})
export class NameFilter implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }


    return items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
  }

}


@Pipe({
  name: 'RemoveHtml'
})
export class RemoveHtmlFilter implements PipeTransform {

 transform(value: string): any {
   return value.replace(/<[^>]*>/g, '');
 }

}

@Pipe({
  name: 'PolskieNazwy'
})
export class PolskieNazwyFilter implements PipeTransform {

  transform(value: string): any {
    return SurveyQueryNamingDictionary[value]??value
  }

}


