import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Customer} from "./types";
import {CustomersService} from "./customers.service";

@Component({
  selector: 'app-customer-list',
  template: `
    <h2>A list of our customers</h2>
    <div class="table-container">
      <p-table [value]="customerList" [paginator]="true" [rows]="10">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="id">Customer ID
              <p-sortIcon field="id"></p-sortIcon>
            </th>
            <th pSortableColumn="firstName">Firstname
              <p-sortIcon field="firstName"></p-sortIcon>
            </th>
            <th pSortableColumn="lastName">Lastname
              <p-sortIcon field="lastName"></p-sortIcon>
            </th>
            <th pSortableColumn="birthdate">Date of Birth
              <p-sortIcon field="birthdate"></p-sortIcon>
            </th>
            <th pSortableColumn="active">active customer
              <p-sortIcon field="active"></p-sortIcon>
            </th>
            <th>
              <button (click)="addCustomer()" class="add-customer-button rounded-button">Add customer</button>
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-customer>
          <tr>
            <td>{{customer.id}}</td>
            <td>{{customer.firstName}}</td>
            <td>{{customer.lastName}}</td>
            <td>{{customer.birthdate}}</td>
            <td [class.active]="customer.active" [class.inactive]="!customer.active">
              {{customer.active == true ? 'active customer' : 'inactive customer' }}</td>
            <td>
              <button (click)="editCustomer(customer)" class="edit-button rounded-button">
                <img src="assets/edit-list.png" alt="a icon to edit a customer" class="icon"></button>
              <button (click)="deleteCustomer(customer)" class="delete-button rounded-button">
                <img src="assets/trash-bin.png" alt="a icon to delete a customer" class="icon"></button>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
    <div class="container">
      <label for="search-customer-by-lastname">Search a customer by his lastname: </label>
      <input id="search-customer-by-lastname" placeholder="please insert name" (keydown.enter)="filterCustomer()"
             [(ngModel)]="lastNameFromInput" appMandatoryStringInputLength="3">
      <button (click)="filterCustomer()" class="search-button rounded-button">Search</button>
      <button (click)="refresh(); showErrorMessage=false" class="show-all-customers-button rounded-button">Show all customers</button>
      <span *ngIf="showErrorMessage" class="error">Something happend! Please check your spelling.</span>
    </div>
  `,
  styles: [`
    th, td {
      border: 1px solid black;
      padding: 5px;
      text-align: center;
    }

    .table-container {
      border: 3px solid dodgerblue;
      width: 800px;
      padding: 5px;
    }

    .container {
      margin-top: 5px;
      length: 800px;
    }

    .error {
      color: red;
      font-style: italic;
      margin-left: 5px;
    }

    .active {
      color: green;
    }

    .inactive {
      color: red
    }

    .search-button {
      margin-left: 20px;
    }

    .show-all-customers-button {
      margin-left: 30px;
    }

    .add-customer-button {
      margin-right: 4px;
      margin-left: 4px;
      background-color: dodgerblue;
      color: white;
    }
    .edit-button{
      background-color: limegreen;
    }

    .delete-button {
      margin-left: 24px;
      background-color: red;
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
    if (lastNameFromInput.toUpperCase().trim() === this.lastNameFromInput?.toUpperCase().trim() && this.lastNameFromInput?.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
