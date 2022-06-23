import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styles: [
  ]
})
export class ChartBaseComponent {

  backgroundColor: string[] = ['#f1ab41', '#037bc0', '#02af57', '#4A235A', '#FC4F4F', '#FC6228', '#B7950B', '#BA4A00', '#5F6A6A', '#8B1A1A'];

  constructor() { }

}
