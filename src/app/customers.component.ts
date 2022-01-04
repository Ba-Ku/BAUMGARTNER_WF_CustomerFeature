import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  template: `
    <p>
      customers works!
    </p>
    <app-customers-input></app-customers-input>
    <app-customer-list></app-customer-list>
  `,
  styles: [
  ]
})
export class CustomersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
