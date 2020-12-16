import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, Variables } from 'src/app/core/models';
import { CustomersService } from 'src/app/core/services';
import { CustomersAddEditComponent } from '../customers-add-edit/customers-add-edit.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  public customer: Customer;
  public variables: Variables;
  public customers$: Observable<Customer[]>;
  private modalReference: NgbModalRef;

  constructor(
    private _customerService: CustomersService,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customers$ = this._customerService.getCustomers().pipe(
      map(customers => {
        this.variables = this._customerService.getVariables(customers);
        return customers;
      })
    );
  }

  createCustomer() {
    this.openModal();
  }

  updateCustomer(customer: Customer) {
    this.openModal(customer);
  }

  openModal(customer: Customer = null) {
    this.modalReference = this._modalService.open(CustomersAddEditComponent, { scrollable: true, size: 'sm' });
    this.modalReference.componentInstance.customer = customer;

    this.modalReference.result.then(
      result => {},
      reason => {}
    );
  }

  deleteCustomer(customerId: string) {
    this._customerService.deleteCustomer(customerId).subscribe();
  }

  selectCustomer(customer: Customer) {
    this.customer = customer;
  }
}
