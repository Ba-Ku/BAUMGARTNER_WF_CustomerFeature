import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CustomersComponent} from './customers.component';
import {CustomerListComponent} from './customer-list.component';
import {CustomersInputComponent} from './customers-input.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MandatoryStringInputLengthDirective } from './mandatory-string-input-length.directive';
import { HomeComponent } from './home.component';
import { DataProtectionDeclarationComponent } from './data-protection-declaration.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerListComponent,
    CustomersInputComponent,
    MandatoryStringInputLengthDirective,
    HomeComponent,
    DataProtectionDeclarationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'dataprotection', component: DataProtectionDeclarationComponent},
      {path: '**', redirectTo: 'home'}
    ]),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
