import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService, Customer, CustomerRepresentative, CustomerStatus, CustomerCountry, RequestOptions, TableUtilsService } from '../services';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'complete-table',
  templateUrl: './complete-client-side.component.html'
})
export class CompleteClientSideTableComponent implements OnInit {

  constructor(
    private dataService: CustomerService,
    private tableUtils: TableUtilsService
  ) { }

  @ViewChild('dt') table: Table;
  showPaginator = true;
  customers: Customer[];
  tmpCustomers: Customer[];
  representatives: CustomerRepresentative[];
  statuses: CustomerStatus[];
  countries: CustomerCountry[];
  totalRecords: number;
  tmpTotalRecords: number;
  selectedCustomer: Customer;
  loading = true;
  clonedCustomers: { [key: string]: Customer; } = {};
  previousEvent: LazyLoadEvent;

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getCustomersRepresentatives().then(results => this.representatives = results);
    this.dataService.getCustomersStatuses().then(results => this.statuses = results);
    this.dataService.getCustomersCountries().then(results => this.countries = results);

    this.dataService.getCustomers(new RequestOptions()).then(results => {
      this.customers = results.records;
      this.totalRecords = results.totalRecords;
      this.loading = false;
    });

  }

  onActivityChange(event): void {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value, null);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateChange(value): void {
    this.table.filter(value.toISOString(), 'date', 'equals');
  }

  onRepresentativeChange(event): void {
    this.table.filter(event.value.map(x => x.name).toString(), 'representative', 'in');
  }

  onCountryChange(event): void {
    this.table.filter(event.value.map(x => x.code).toString(), 'country', 'in');
  }

  onRowEditInit(customer: Customer): void {
    this.clonedCustomers[customer.id] = { ...customer };
  }

  onRowEditSave(customer: Customer): void {
    // if (customer.price > 0) {
    //   delete this.clonedProducts[customer.id];
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    // }
    // else {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    // }
  }

  onRowEditCancel(customer: Customer, index: number): void {
    this.customers[index] = this.clonedCustomers[customer.id];
    delete this.customers[customer.id];
  }
}
