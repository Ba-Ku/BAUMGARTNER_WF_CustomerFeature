import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Customer} from "./types";
import {CustomersService} from "./customers.service";

@Component({
  selector: 'app-customer-list',
  template: `
    <h2>A list of our customers</h2>
    <table>
      <thead>
      <tr>
        <th>Customer ID</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Date of Birth</th>
        <th>active customer</th>
        <th>
          <button (click)="addCustomer()">Add customer</button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let customer of customerList">
        <td>{{customer.id}}</td>
        <td>{{customer.firstName}}</td>
        <td>{{customer.lastName}}</td>
        <td>{{customer.birthdate}}</td>
        <td [class.active]="customer.active" [class.inactive]="!customer.active">{{customer.active}}</td>
        <td>
          <button (click)="editCustomer(customer)">edit</button>
          <button (click)="deleteCustomer(customer)">delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="container">
      <label for="search-customer-by-lastname">Search a customer by his lastname: </label>
      <input id="search-customer-by-lastname" placeholder="please insert name" [(ngModel)]="lastNameFromInput" appMandatoryStringInputLength="3">
      <button (click)="filterCustomer()">Search</button>
      <button (click)="refresh(); showErrorMessage=false">Show all customers</button>
      <span *ngIf="showErrorMessage" class="error">Something happend! Please check your spelling.</span>
    </div>
  `,
  styles: [`
    th, td {
      border: 1px solid black;
      padding: 5px;
    }

    table {
      border: 3px solid dodgerblue;
    }

    button {
      margin-right: 4px;
      margin-left: 4px;
    }

    .container {
      margin-top: 5px;
    }

    .error {
      color: red;
      font-style: italic;
    }

    .active {
      color: green;
    }

    .inactive {
      color: red
    }
  `]
})
export class CustomerListComponent implements OnInit {
  @Output() select = new EventEmitter<number>();
  customerList: Customer[] = [];
  lastNameFromInput?: string;
  showErrorMessage: boolean = false;

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

  addCustomer(): void {
    this.select.emit();
  }

  editCustomer(customer: Customer): void {
    this.select.emit(customer.id);
  }

  filterCustomer(): void {
    const filteredCustomer = this.customerList
      .filter(customer => customer.lastName.toUpperCase().trim() === this.lastNameFromInput?.toUpperCase().trim());
    const filteredCustomerLastName = filteredCustomer
      .map(customer => customer.lastName)
      .join();

    if (this.checkLastNameFromInput(filteredCustomerLastName)) {
      this.customerList = filteredCustomer;
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }

  checkLastNameFromInput(lastNameFromInput: string): boolean {
    if (lastNameFromInput.toUpperCase().trim() === this.lastNameFromInput?.toUpperCase().trim() && this.lastNameFromInput?.length>0) {
      return true;
    } else {
      return false;
    }
  }
}
