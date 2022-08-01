import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHRISMessage } from '../_models/IHRISMessage';

@Injectable({
  providedIn: 'root',
})

export class ErrorNotificationService {

  public notification = new BehaviorSubject<IHRISMessage | null>(null);

  constructor() { }

}
