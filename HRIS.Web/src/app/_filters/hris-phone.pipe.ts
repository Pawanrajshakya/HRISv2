import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrisPhone'
})
export class HrisPhonePipe implements PipeTransform {

  transform(value: string): string {
    if (value !== undefined && value !== null && value.length > 0) {
      return value.replace(/[^\d]/g, '').replace(/^[0-1]+/, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else {
      return "No Data";
    }
  }

}
