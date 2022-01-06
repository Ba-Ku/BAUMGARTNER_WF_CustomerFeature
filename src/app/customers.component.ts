import {Component, ViewChild} from '@angular/core';
import {CustomersService} from "./customers.service";
import {CustomerListComponent} from "./customer-list.component";
import {Customer} from "./types";

@Component({
  selector: 'app-customers',
  template: `
    <h1>Customer Management!</h1>

    <app-customer-list
      #customerList
      (select)="selectCustomer($event)"
    ></app-customer-list>

    <app-customers-input
      *ngIf="selectedCustomer"
      [customer]="selectedCustomer"
      (confirm)="unselectCustomer(true)"
      (cancel)="unselectCustomer(false)"
    ></app-customers-input>
  `,
  styles: []
})
export class CustomersComponent {
  @ViewChild('customerList') customerList!: CustomerListComponent;
  selectedCustomer?: Customer;

  constructor(private customersService: CustomersService) {
  }

  selectCustomer(id: number): void {
    if (id) {
      this.customersService.retrieveCustomerById(id)
        .then(customer => this.selectedCustomer = customer);
    } else {
      this.selectedCustomer = new Customer();
    }
  }

  unselectCustomer(refresh: boolean): void {
    this.selectedCustomer = undefined;

    if (refresh==true) {
      this.customerList.refresh();
    }
  }
}
