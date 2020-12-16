import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from 'src/app/core/services';
import { Customer } from 'src/app/core/models';

@Component({
  selector: 'app-customers-add-edit',
  templateUrl: './customers-add-edit.component.html',
  styleUrls: ['./customers-add-edit.component.scss']
})
export class CustomersAddEditComponent implements OnInit {

  @Input() customer: Customer = null;
  customerId: string;

  public customerForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private config: NgbModalConfig,
    private _customerService: CustomersService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.customerId = this.customer?.id;
    this.initializeOrClenForm(this.customer);
  }

  /**
   * Initialize a form or clean
   */
  initializeOrClenForm(customer: Customer = null) {
    this.customerForm = this._formBuilder.group({
      name      : new FormControl(customer?.name, [ Validators.required ]),
      surname   : new FormControl(customer?.surname, [ Validators.required ]),
      age       : new FormControl(customer?.age, [ Validators.required ]),
      birthdate : new FormControl(customer?.birthdate, [ Validators.required ])
    });
  }

  /**
   * Submit form to create or update a customer
   */
  onSubmit() {
    if (this.customerForm.invalid) return;
    this.customerForm.disable();
    this.customer = this.customerForm.value;

    this.onPreviousSave();
  }

  onPreviousSave() {
    this._customerService.getGenderByName(this.customer.name).subscribe(response => {
      this.customer.gender = response.gender;
      this._customerService.getRangeMaxAgeByAgeAndGender(
        this.customer.gender, this.customer.age, this.customer.birthdate.toString()).subscribe(deathdate => {
          this.customer.deathdate = deathdate;
          if (!this.customerId) {
            this.onCreate();
            return;
          }
          this.onUpdate();
        });
    });
  }

  onCreate() {
    this._customerService.saveCustomer(this.customer).subscribe(created => {
      this.customerForm.enable();
      this.activeModal.close();
    }, err => {
      this.customerForm.enable();
    });
  }

  onUpdate() {

  }
}
