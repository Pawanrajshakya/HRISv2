import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrisTrim'
})
export class HrisTrimPipe implements PipeTransform {

  transform(value: any) {
    if (value) {
        return value.trim();
    }
    return value;
}

}
