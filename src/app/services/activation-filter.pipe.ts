import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activationFilter',
})
export class activationFilterPipe implements PipeTransform {
  transform(items: any[], terms: string): any[] {
    if (!items) return [];
    if (!terms) return items;
    terms = terms.toLowerCase();
    return items.filter((it) => {
      if (it.imei != null) {
        return it.imei
          .replace(/ /g, '')
          .toLowerCase()
          .includes(terms.replace(/ /g, ''));
      } else return false;
    });
  }
}
