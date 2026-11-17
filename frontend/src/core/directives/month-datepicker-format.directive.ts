import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

const MONTH_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: null,
  },
  display: {
    dateInput: { month: 'long', year: 'numeric' },
    monthYearLabel: { month: 'long', year: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long'},
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Directive({
  selector: '[appMonthDatepickerFormat]',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MONTH_DATE_FORMATS }],
})
export class MonthDatepickerFormatDirective {}
