import { Component, OnInit, OnDestroy } from '@angular/core';
import {interval, Subscription, Observable, Observer} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private observableSubscription: Subscription;
  private model: any;
  private customObservable: Observable<number>;
  constructor() { }

  ngOnInit() {
    // this.observableSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    this.customObservable = new Observable((observer: Observer<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 3){
          observer.complete();
        }
        if(count > 3) {
          observer.error(count);
        }
        count++;
      }, 1000);
    });

    this.customObservable.subscribe((data) => {
      console.log(data);
    })
  }

  ngOnDestroy() {
    // this.observableSubscription.unsubscribe();
  }

}
