import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersAddEditComponent } from './customers-add-edit/customers-add-edit.component';
import { CustomersDetailComponent } from './customers-detail/customers-detail.component';

@NgModule({
  declarations: [
    CustomersListComponent,
    CustomersAddEditComponent,
    CustomersDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CustomersRoutingModule
  ],
  exports: [
    //CustomersAddEditComponent
  ],
  providers: [],
  entryComponents: [
    
  ]
})
export class CustomersModule { }