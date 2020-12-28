import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  content = 'Secret password = tuna';
  showDetail = true;
  toggleCount = 0;
  toggleValues = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplay = () => {
    this.showDetail = !this.showDetail;
    this.toggleCount = this.toggleCount + 1;
    this.toggleValues.push(this.toggleCount);
  }

}
