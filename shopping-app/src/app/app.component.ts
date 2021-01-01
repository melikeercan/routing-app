import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-app';
  loadedFeature = 'shopping-list';

  value = Math.floor(Math.random() * Math.floor(10));

  onNavigate = (feature: string) => {
    this.loadedFeature = feature;
  }
}
