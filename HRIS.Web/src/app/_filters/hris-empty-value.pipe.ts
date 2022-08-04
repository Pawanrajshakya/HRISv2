import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrisEmptyValue'
})
export class HrisEmptyValuePipe implements PipeTransform {

  transform(value?: string): string {
    
    if (value && value !== undefined && value !== null)
      return value;
    else
      return 'No Data';
  }

}
