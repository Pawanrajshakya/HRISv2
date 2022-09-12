import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EcardService {
  
  selectedRCs = new EventEmitter<string[]>();

  constructor() {}
}
