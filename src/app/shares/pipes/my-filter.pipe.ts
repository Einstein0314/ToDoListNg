import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter',
  pure: false //let the pipe can detect other than string, number ...
})
export class MyFilterPipe implements PipeTransform {

  transform(items: any[], filter: any={property: "", type: false}): any {
    if(!items || filter.property==""){
      return items;
    }
    return items.filter(item=>item[filter.property]==filter.type);
  }

}
