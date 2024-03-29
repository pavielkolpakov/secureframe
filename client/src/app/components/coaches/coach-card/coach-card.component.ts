import { Component, Input } from '@angular/core';
import { AppointmentsService, Coach } from '../../../services/appointments.service';
import { Observable } from 'rxjs';
import { CommonModule, formatDate } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-coach-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatChipsModule
  ],
  templateUrl: './coach-card.component.html',
  styleUrl: './coach-card.component.scss'
})
export class CoachCardComponent {

  @Input() coach: Coach;

  appointments$: Observable<any>;
  response$: Observable<any>;

  public errorMessage: string;
  public date: string;
  public time: string;
  public name: string;
  public email: string;

  constructor(
    private readonly appointmentsService: AppointmentsService
  ) {}

  getAvailableAppointments(event) {
    this.appointments$ = this.appointmentsService.getAppointments(this.coach.id, formatDate(event.value, 'yyyy-MM-dd', 'en-US'));
  }

  bookAppointment() {
    if (this.name && this.email && this.time) {
      this.errorMessage = "";
      this.response$ = this.appointmentsService.bookAppointment(this.coach.id, this.name, this.email, `${formatDate(this.date, 'yyyy-MM-dd', 'en-US')} ${this.time}`);

      this.appointments$ = null;
      this.time = null;
      this.name = null;
      this.email = null;
    } else {
      this.errorMessage = "please input all requiered data";
    }
  }

  converTime(time: string) {
    const parsed = new Date(Date.parse(`2024-10-10T${time}`));
    console.log(parsed);
    return parsed;
  }

  myFilter = (d: Date | null): boolean => {
    const today = new Date()
    return this.coach.available_days.includes(formatDate(d, 'EEEE', 'en-US')) && today < d;
  };
}
