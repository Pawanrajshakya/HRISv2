import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrisParentheses',
})
export class HrisParenthesesPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.charAt(0) === '-'
      ? '(' + value.substring(1, value.length) + ')'
      : value;
  }
}
