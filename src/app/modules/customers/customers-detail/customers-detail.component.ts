import { Component, Input, OnInit } from '@angular/core';
import { Customer, Variables } from 'src/app/core/models';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.scss']
})
export class CustomersDetailComponent implements OnInit {

  @Input() variables: Variables;
  @Input() customer: Customer;

  constructor() { }

  ngOnInit(): void {
  }

}
