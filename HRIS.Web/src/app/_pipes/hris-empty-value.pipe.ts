import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrisEmptyValue',
})
export class HrisEmptyValuePipe implements PipeTransform {
  transform(value?: string, replaceWith?: string): string {
    if (value && value !== undefined && value !== null) return value;
    else if (replaceWith && replaceWith?.length > 0) return replaceWith;
    else return 'No Data';
  }
}
