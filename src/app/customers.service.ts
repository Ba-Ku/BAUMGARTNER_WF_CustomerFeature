import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "./types";

const CUSTOMERS_RESOURCE_URL = 'http://localhost:8080/resources/customers';

@Injectable({
  providedIn: 'root'
})

export class CustomersService {

  constructor(private httpClient: HttpClient) {
  }

  createCustomer(customer: Customer): Promise<any> {
    return this.httpClient.post(CUSTOMERS_RESOURCE_URL, customer).toPromise();
  }

  retrieveCustomerById(id: number): Promise<Customer> {
    return this.httpClient.get<Customer>(CUSTOMERS_RESOURCE_URL + '/' + id).toPromise();
  }

  updateCustomer(customer: Customer): Promise<any> {
    return this.httpClient.put(CUSTOMERS_RESOURCE_URL + '/' + customer.id, customer).toPromise();
  }

  deleteCustomer(id: number): Promise<any> {
    return this.httpClient.delete(CUSTOMERS_RESOURCE_URL + '/' + id).toPromise();
  }

  retrieveAllCustomers(): Promise<Customer[]> {
    return this.httpClient.get<Customer[]>(CUSTOMERS_RESOURCE_URL).toPromise();
  }
}
