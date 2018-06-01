import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progressbar.html'
})
export class ProgressBarComponent {

  @Input() progress: number;

  constructor() {}

}
