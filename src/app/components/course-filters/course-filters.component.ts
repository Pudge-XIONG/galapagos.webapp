import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment, Moment} from 'moment';
import {Moment} from 'moment';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
/*
export const MY_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};
*/

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-course-filters',
  templateUrl: './course-filters.component.html',
  styleUrls: ['./course-filters.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})

export class CourseFiltersComponent implements OnInit {
  _pickedDate: Date;
  selectedDate: Moment;
  _pickedState: String;
  formDate = new FormControl(_moment());

  @Output() pickedDateChange = new EventEmitter();
  @Output() pickedStateChange = new EventEmitter();

  @Input()
  public set pickedState(value: String){
    this._pickedState = value;
    this.pickedStateChange.emit(this._pickedState);
  };

  public get pickedState(): String{
    return this._pickedState;
  };

  @Input()
  public set pickedDate(value: Date){
    this._pickedDate = value;
    this.pickedDateChange.emit(this._pickedDate);
  };

  public get pickedDate(): Date{
    return this._pickedDate;
  };
  
  constructor(private adapter: DateAdapter<any>) {}

  ngOnInit() {
    this.adapter.setLocale('fr');
    this._pickedDate = new Date();
    this.selectedDate = _moment();
  }

  chosenYearHandler(normalizedYear: Moment) {
    this.selectedDate.year(normalizedYear.year());
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    this.selectedDate.month(normlizedMonth.month());
    this.pickedDate = this.selectedDate.toDate();
    this.formDate.value.year(this.selectedDate.year());
    this.formDate.value.month(this.selectedDate.month());
    
    datepicker.close();
  }

}
