import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CustomersComponent} from './customers.component';
import {CustomerListComponent} from './customer-list.component';
import {CustomersInputComponent} from './customers-input.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MandatoryStringInputLengthDirective } from './mandatory-string-input-length.directive';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerListComponent,
    CustomersInputComponent,
    MandatoryStringInputLengthDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
