import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService, Customer, CustomerRepresentative, CustomerStatus, CustomerCountry, RequestOptions, TableUtilsService } from '../services';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'complete-table',
  templateUrl: './complete-server-side.component.html'
})
export class CompleteServerSideTableComponent implements OnInit {

  @ViewChild('dt') table: Table;
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
  showPaginator = true;

  constructor(
    private dataService: CustomerService,
    private tableUtils: TableUtilsService
  ) { }

  ngOnInit(): void {
    this.dataService.getCustomersRepresentatives().then(results => this.representatives = results);
    this.dataService.getCustomersStatuses().then(results => this.statuses = results);
    this.dataService.getCustomersCountries().then(results => this.countries = results);
  }

  onModeChanged(): void {
    this.previousEvent = {};
    this.customers = [];
    this.totalRecords = 0;
    this.table.reset();
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

  onLazyLoad(event: LazyLoadEvent): void {
    this.loading = true;

    if (this.showPaginator) {
      this.customers = [];
    } else {
      this.customers = this.tableUtils.resetDataSource(this.customers, event, this.previousEvent, this.table);
      this.previousEvent = JSON.parse(JSON.stringify(event));
    }

    this.dataService.getCustomers(new RequestOptions(event))
      .then(results => {
        if (this.showPaginator) {
          this.customers = results.records;
          this.totalRecords = results.totalRecords;
        } else {
          this.customers = this.tableUtils.updateDataSource(this.customers, event.first, event.rows, results);
          // trigger change detection
          this.customers = [...this.customers];
          this.totalRecords = this.customers.length;
        }

        this.loading = false;
      });
  }
}
