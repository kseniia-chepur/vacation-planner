import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MonthDatepickerFormatDirective } from '../../../directives/month-datepicker-format.directive';

@Component({
  selector: 'app-add-destination',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDatepicker,
    MonthDatepickerFormatDirective,
  ],
  templateUrl: './add-destination.component.html',
  styleUrl: './add-destination.component.scss',
})
export class AddDestinationComponent {
  private readonly fb = inject(FormBuilder);

  public destinationForm = this.fb.group({
    name: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    periodType: this.fb.control<string>(''),
    month: this.fb.control<Date | null>(null),
    year: this.fb.control<string>(''),
    startDate: this.fb.control<Date | null>(null),
    endDate: this.fb.control<Date | null>(null),
    notes: this.fb.control<string>(''),
  });

  public minDate = new Date();
  public minMonthDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  private periodType = toSignal(this.destinationForm.controls.periodType.valueChanges);

  public isMonthPeriod = computed(() => this.periodType() === 'month');
  public isDateRangePeriod = computed(() => this.periodType() === 'dateRange');

  public onMonthSelected(date: Date, datepicker: MatDatepicker<Date>) {
    this.destinationForm.controls.month.setValue(date);
    datepicker.close();
  }

  public onSubmit(): void {
    const name = this.destinationForm.controls.name.value.trim();

    if (this.destinationForm.invalid || !name) {
      return;
    }

    const destination = this.destinationForm.getRawValue();
    destination.name = name;
  }
}
