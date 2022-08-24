import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaryService {
  selectedRCs = new EventEmitter<string[]>();

  constructor() {}
}
