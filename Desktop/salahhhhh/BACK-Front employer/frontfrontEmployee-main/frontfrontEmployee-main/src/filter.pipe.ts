// filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, property: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText || !property) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const propertyValue = item[property].toLowerCase();
      return propertyValue.includes(searchText);
    });
  }
}
