import {Component, OnInit} from '@angular/core';
import {Customer} from "./types";
import {CustomersService} from "./customers.service";

@Component({
  selector: 'app-customer-list',
  template: `
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Date of Birth</th>
          <th>active customer</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let customer of customerList">
          <td>{{customer.id}}</td>
          <td>{{customer.firstName}}</td>
          <td>{{customer.lastName}}</td>
          <td>{{customer.birthdate}}</td>
          <td>{{customer.active}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    th, td {
      border: 1px solid black;
      padding: 5px;
    }
  `]
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[] = [];


  constructor(private customersService: CustomersService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.customersService.retrieveAllCustomers()
      .then(allCustomers => this.customerList = allCustomers);
  }

  deleteCustomer(customer: Customer): void {
    if (confirm('Do you really wish to delete this customer?')) {
      this.customersService.deleteCustomer(customer.id!)
        .then(() => this.refresh());
    }
  }

  addCustomer() {

  }

  editCustomer() {

  }
}
