import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificationService {

  public notification = new BehaviorSubject<string | null>(null);

  constructor() { }

}
