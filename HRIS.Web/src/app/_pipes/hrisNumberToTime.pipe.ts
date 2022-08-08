import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrisNumberToTime',
})
export class HrisNumberToTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value || value > 0) {
      var newvalue = value.toString();

      var vArray = newvalue.split('.');

      var len = vArray.length > 1 ? vArray[1].length : 0;

      newvalue = len === 1 ? newvalue + '0' : newvalue;

      var returnvalue =
        newvalue.indexOf('.') > 0
          ? newvalue.replace('.', ' hrs :') + ' min'
          : newvalue + ' hrs';

      return returnvalue;
    } else {
      return '0 hr';
    }
  }
}
