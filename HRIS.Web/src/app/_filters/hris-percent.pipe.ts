import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrisPercent'
})
export class HrisPercentPipe implements PipeTransform {

  transform(value: any): any {
    if (value === 'No Data') 
      return value;
    else if (value === undefined && value === null)
      return '0 %';
    else
      return value + ' %';
  }

}
