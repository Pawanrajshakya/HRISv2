import { NgModule } from '@angular/core';
import { HrisEmptyValuePipe } from '../_pipes/hris-empty-value.pipe';
import { HrisParenthesesPipe } from '../_pipes/hris-parentheses.pipe';
import { HrisPercentPipe } from '../_pipes/hris-percent.pipe';
import { HrisPhonePipe } from '../_pipes/hris-phone.pipe';
import { HrisTrimPipe } from '../_pipes/hris-trim.pipe';
import { HrisNumberToTimePipe } from '../_pipes/hrisNumberToTime.pipe';

@NgModule({
  declarations: [
    HrisEmptyValuePipe,
    HrisPhonePipe,
    HrisPercentPipe,
    HrisParenthesesPipe,
    HrisNumberToTimePipe,
    HrisTrimPipe,
  ],
  exports: [
    HrisEmptyValuePipe,
    HrisPhonePipe,
    HrisPercentPipe,
    HrisParenthesesPipe,
    HrisNumberToTimePipe,
    HrisTrimPipe,
  ],
})
export class PipeModule {}
