import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomersService} from "./customers.service";
import {Customer} from "./types";

@Component({
  selector: 'app-customers-input',
  template: `
    <form #form="ngForm">
      <h2>{{customer.id ? 'Edit customer' : 'Add customer'}}</h2>

      <div *ngIf="customer.id">
        <label for="id">ID:</label>
        <input id="id" type="number" [value]="customer.id" readonly>
      </div>

      <div>
        <label for="firstname">Firstname: </label>
        <input id="firstname" name="firstname" type="text" [(ngModel)]="customer.firstName" required minlength="2">
      </div>

      <div>
        <label for="lastname">Lastname: </label>
        <input id="lastname" name="lastname" type="text" [(ngModel)]="customer.lastName" required minlength="2">
      </div>

      <div>
        <label for="birthdate">Date of birth: </label>
        <input id="birthdate" name="birthdate" type="Date" [(ngModel)]="customer.birthdate">
      </div>

      <div>
        <label for="is-active">Is an active customer? </label>
        <input id="is-active" name="is-active" type="checkbox" [(ngModel)]="customer.active">
      </div>

      <div class="container">
        <button *ngIf="form.valid" id="confirm" type="button" (click)="confirmAction()">confirm</button>
        <button id="cancel" type="button" (click)="cancelAction()">cancel</button>
      </div>
    </form>
  `,
  styles: [`
    .container {
      display: flex;
    }

    button {
      margin-top: 3px;
      margin-bottom: 3px;
    }

    #confirm {
      justify-content: flex-start;
      margin-right: 30px;
    }

    #cancel {
      justify-content: flex-end;
    }
  `]
})
export class CustomersInputComponent {
  @Input() customer = new Customer();
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private customersService: CustomersService) {
  }

  confirmAction(): void {
    if (this.customer.id) {
      this.customersService.updateCustomer(this.customer)
        .then(() => this.confirm.emit());
    } else {
      this.customersService.createCustomer(this.customer)
        .then(() => this.confirm.emit());
    }
  }

  cancelAction(): void {
    this.cancel.emit();
  }
}
