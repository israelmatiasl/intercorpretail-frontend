import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { CountryRange, Customer, GenderByName, Variables } from '../models';
import { ranges } from '../helpers/ranges';
import { getDateFromString, addYearsToDate } from '../helpers/functions';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private genreUrl: string;
  private bbcUrl: string;

  constructor(
    private _http: HttpClient,
    private firestore: AngularFirestore
  ) {
    this.genreUrl = environment.genderApi;
    this.bbcUrl = environment.bbcFiles;
  }

  getGenderByName(name: string) {
    let nameNormalize = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return this._http.get<GenderByName>(`${this.genreUrl}?name=${nameNormalize}`);
  }

  getRangeMaxAgeByAgeAndGender(gender: string, age: number, birthdate: string) : Observable<string> {
    let rangeIndex = ranges.findIndex(p => p[0] <= age && p[1] >= age);
    let range = `${ranges[rangeIndex][0]}-${ranges[rangeIndex][1]}`;
    return this._http.get(`${this.bbcUrl}/${range}.json`).pipe(
      map(response => {
        let peruRanges: CountryRange = response['south_america']['PER'];
        let plusYears = 0;
        switch(gender) {
          case 'male':  plusYears = Math.round(age + peruRanges.m.le);
          case 'female': plusYears = Math.round(age + peruRanges.f.le);
          default: plusYears = Math.round(age + peruRanges.n.le);
        }
        return addYearsToDate(getDateFromString(birthdate), plusYears);
      })
    );
  }

  getCustomers() : Observable<Customer[]> {
    return this.firestore.collection('customers').snapshotChanges().pipe(
      map(data => {
        return data.map(_data => {
          let customer = _data.payload.doc.data() as Customer;
          customer.id = _data.payload.doc.id;
          return customer;
        });
      })
    )
  }

  saveCustomer(customer: Customer) : Observable<Customer> {
    return from(this.firestore.collection('customers').add(customer)).pipe(
      map(data => {
        customer.id = data.id;
        return customer;
      })
    );
  }

  updateCustomer(customerId: string, customer: Customer) {
    return from(this.firestore.collection('customers').doc(customerId).update(customer)).pipe();
  }

  deleteCustomer(customerId: string) {
    return from(this.firestore.collection('customers').doc(customerId).delete()).pipe();
  }

  getVariables(customers: Customer[]) {
    let ages = customers.map(p=>p.age);
    return new Variables(
      this.getAverage(ages).toFixed(2),
      this.getStandardDerivation(ages).toFixed(2)
    );
  }

  private getAverage = (values: number[]) => ((values.reduce((a,b) => a+b, 0)) / values.length);

  private getStandardDerivation(values: number[]) {
    let average = this.getAverage(values);
    let summation = values.map(value => {
      return Math.pow((value - average), 2);
    });

    let summationResult = summation.reduce((a,b) => a+b, 0);
    return Math.sqrt((summationResult/(values.length-1)));
  }

}
