import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-customers',
  template: `
    <p>
      customers works!
    </p>
    <app-customer-list></app-customer-list>
    <app-customers-input></app-customers-input>
  `,
  styles: []
})
export class CustomersComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
