import { Pipe, PipeTransform } from '@angular/core';

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
