import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../services';

@Component({
  selector: 'basic-table',
  templateUrl: './basic-client-side.component.html'
})
export class BasicClientSideTableComponent implements OnInit {
  customers: Customer[];
  showPaginator = true;
  loading: boolean;
  totalRecords: number;

  constructor(private dataService: CustomerService) { }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getCustomers().then(results => {
      this.customers = results.records;
      this.totalRecords = results.totalRecords;
      this.loading = false;
    });
  }
}
