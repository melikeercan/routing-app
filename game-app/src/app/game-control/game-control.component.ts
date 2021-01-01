import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  counter: number;
  interval: any;
  @Output() intervalFired = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.counter = 0;
  }

  increment = () => {
    this.counter++;
    console.log(this.counter + ' after increment');
  }

  onStart = () => {
    this.interval = setInterval(() => {
      this.increment();
      this.intervalFired.emit(this.counter);
    }, 1000);
  }

  onStop = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
