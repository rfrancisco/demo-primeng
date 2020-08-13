import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults, RequestOptions } from './models';

@Injectable()
export class CustomerService {

  private baseUrl = 'http://localhost:5000/customers';

  constructor(private http: HttpClient) { }

  getCustomers(options?: RequestOptions): Promise<PagedResults<Customer>> {
    const params = options?.toHttpParams();
    console.log(`${this.baseUrl}/${params?.toString()}`);
    return this.http.get<PagedResults<Customer>>(this.baseUrl, { params }).toPromise();
  }

  getCustomersRepresentatives(): Promise<CustomerRepresentative[]> {
    const url = `${this.baseUrl}/representatives`;
    return this.http.get<CustomerRepresentative[]>(url).toPromise();
  }

  getCustomersStatuses(): Promise<CustomerStatus[]> {
    const url = `${this.baseUrl}/statuses`;
    return this.http.get<CustomerStatus[]>(url).toPromise();
  }

  getCustomersCountries(): Promise<CustomerCountry[]> {
    const url = `${this.baseUrl}/countries`;
    return this.http.get<CustomerCountry[]>(url).toPromise();
  }
}

export interface CustomerCountry {
  name?: string;
  code?: string;
}

export interface CustomerRepresentative {
  name?: string;
  image?: string;
}

export interface CustomerStatus {
  label?: string;
  value?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: CustomerCountry;
  company?: string;
  date?: string;
  status?: string;
  activity?: number;
  representative?: CustomerRepresentative;
}
