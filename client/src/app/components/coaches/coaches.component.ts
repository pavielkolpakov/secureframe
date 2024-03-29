import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Observable } from 'rxjs';
import { CommonModule, formatDate } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CoachCardComponent } from './coach-card/coach-card.component';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [
    CommonModule,
    CoachCardComponent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss'
})
export class CoachesComponent implements OnInit {

  public coaches$: Observable<any>;
  public appointments$: Observable<any>;
  public date;

  constructor(
    private readonly appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.coaches$ = this.appointmentsService.getCoaches();
  }

  

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
}
