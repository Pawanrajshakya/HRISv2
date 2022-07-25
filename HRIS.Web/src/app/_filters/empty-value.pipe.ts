import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyValue'
})
export class EmptyValuePipe implements PipeTransform {

  transform(value?: string): string {
    if (value && value !== undefined && value !== null)
      return value;
    else
      return 'No Data';
  }

}
