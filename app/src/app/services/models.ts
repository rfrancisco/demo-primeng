import { LazyLoadEvent } from 'primeng/api';
import { HttpParams } from '@angular/common/http';

export interface PagedResults<T> {
  page: number;
  totalPages: number;
  totalRecords: number;
  HasPreviousPage: boolean;
  hasNextPage: boolean;
  records: Array<T>;
}

export class RequestOptions {
  page = 1;
  pageSize = 500;
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm = '';
  filters: { [field: string]: any; } = null;
  delayInMilliseconds = 0;

  constructor(event?: LazyLoadEvent) {
    if (event) {
      this.page = (event.first / event.rows) + 1;
      this.pageSize = event.rows;
      this.sortField = event.sortField ?? '';
      this.sortDirection = event.sortOrder === -1 ? 'desc' : 'asc';
      this.searchTerm = event.globalFilter ?? '';
      this.filters = {};

      for (const key in event.filters) {
        if (Object.prototype.hasOwnProperty.call(event.filters, key)) {
          this.filters[key] = event.filters[key].value;
        }
      }
    }
  }

  toHttpParams(): HttpParams {
    let params = new HttpParams()
      .set('page', this.page.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortField', this.sortField)
      .set('sortDirection', this.sortDirection)
      .set('searchTerm', this.searchTerm)
      .set('delayInMilliseconds', this.delayInMilliseconds.toString());

    for (const key in this.filters) {
      if (Object.prototype.hasOwnProperty.call(this.filters, key)) {
        params = params.set(`filters[${key}]`, this.filters[key]);
      }
    }

    return params;
  }
}
