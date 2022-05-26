import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-modal-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styles: [
  ]
})
export class ModalBaseComponent<T> extends BaseComponent<T> {

  /** Model */
  modalRef?: BsModalRef;

  modalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };
  
  constructor() {
    super();
  }

}
