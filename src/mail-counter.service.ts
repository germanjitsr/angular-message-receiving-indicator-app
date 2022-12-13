import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailCounterService {
  private readonly intialCountValue: number = 0;

  private readonly intervalDurationInMilliseconds: number = 300;

  private readonly initialTimerDelay: number = 0;

  private timerObservable: Observable<number> = timer(
    this.initialTimerDelay,
    this.intervalDurationInMilliseconds
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
    this.counterSubscription = this.timerObservable
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
