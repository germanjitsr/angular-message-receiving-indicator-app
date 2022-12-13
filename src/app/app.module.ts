import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessageReceivingIndicatorComponent } from '../components/message-receiving-indicator/message-receiving-indicator.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
  ],
  declarations: [AppComponent, MessageReceivingIndicatorComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
