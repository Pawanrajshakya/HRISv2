import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeadcountService {
  selectedRCs = new EventEmitter<string[]>();

  constructor() {}
}
