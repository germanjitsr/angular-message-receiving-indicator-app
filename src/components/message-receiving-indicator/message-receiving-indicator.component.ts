import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MailCounterService } from '../../mail-counter.service';

@Component({
  selector: 'app-message-receiving-indicator',
  templateUrl: './message-receiving-indicator.component.html',
  styleUrls: ['./message-receiving-indicator.component.css'],
})
export class MessageReceivingIndicatorComponent implements OnDestroy {
  public mailCount: number;

  public isMailCountBadgeHidden: boolean = false;

  public toggleButtonsDisablity: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private readonly mailCounterService: MailCounterService) {
    this.subscription = this.mailCounterService.currentValue.subscribe(
      (value) => {
        this.isMailCountBadgeHidden = value === 0 ? true : false;
        this.mailCount = value;
      }
    );
  }
  public startReceiving() {
    this.toggleButtonsDisablity = true;
    this.mailCounterService.start();
  }

  public stopReceiving() {
    this.toggleButtonsDisablity = false;
    this.mailCounterService.stop();
  }

  public resetMailCount() {
    if (this.mailCount === null) {
      return;
    }
    this.mailCount = null;
    this.mailCounterService.counterLastValue = 0;
    if (this.mailCounterService.isRunning) {
      this.restart();
    }
  }

  private restart() {
    this.mailCounterService.restart();
  }

  public ngOnDestroy() {
    this.mailCounterService.unsubscribe();
    this.subscription.unsubscribe();
  }
}
