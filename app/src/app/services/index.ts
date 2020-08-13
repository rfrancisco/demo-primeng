
import { NgModule } from '@angular/core';

import { CustomerService } from './customer.service';
import { TableUtilsService } from './table-utils.service';

export * from './models';
export * from './customer.service';
export * from './table-utils.service';

const services = [
  CustomerService,
  TableUtilsService,
];

@NgModule({
  providers: [...services]
})
export class ServicesModule { }
