import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-tool-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styles: [
  ]
})
export class ToolBaseComponent<T> extends BaseComponent<T> {

  /** Model */
  modalRef?: BsModalRef;

  modalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };
  
  constructor(private _ngSelectConfig: NgSelectConfig) {
    super(_ngSelectConfig);
  }

}
