import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ServerComponent} from './server/server.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    WarningAlertComponent,
    SuccessMessageComponent,
    DetailsComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
