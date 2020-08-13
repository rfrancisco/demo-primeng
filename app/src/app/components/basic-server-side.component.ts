import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService, Customer, TableUtilsService, RequestOptions } from '../services';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'basic-table',
  templateUrl: './basic-server-side.component.html'
})
export class BasicServerSideTableComponent implements OnInit {
  @ViewChild('dt') table: Table;
  customers: Customer[];
  loading: boolean;
  totalRecords: number;
  previousEvent: LazyLoadEvent;
  showPaginator = true;

  constructor(
    private dataService: CustomerService,
    private tableUtils: TableUtilsService
  ) { }

  ngOnInit(): void {
  }

  onModeChanged(): void {
    this.previousEvent = {};
    this.customers = [];
    this.totalRecords = 0;
    this.table.reset();
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
