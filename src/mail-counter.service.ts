import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailCounterService {
  private readonly intialCountValue: number = 0;

  private timeInMilliseconds: number = 300;

  private intervalObservable: Observable<number> = interval(
    this.timeInMilliseconds
  );

  private counterSubscription: Subscription;

  public counterLastValue: number = this.intialCountValue;

  public currentValue: BehaviorSubject<number> = new BehaviorSubject(
    this.intialCountValue
  );

  public isRunning: boolean = false;

  constructor() {}

  public start() {
    this.isRunning = true;
    this.counterSubscription = this.intervalObservable
      .pipe(map((value): number => value + this.counterLastValue))
      .subscribe((count) => this.currentValue.next(count));
  }
  public stop() {
    this.counterLastValue = this.currentValue.getValue();
    this.counterSubscription.unsubscribe();
    this.isRunning = false;
  }

  public restart() {
    this.stop();
    this.start();
    this.counterLastValue = this.intialCountValue;
  }
  public unsubscribe() {
    this.counterSubscription.unsubscribe();
    this.isRunning = false;
  }
}
