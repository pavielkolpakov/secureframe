import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Coach {
  id: number,
  name: string,
  timezone: string,
  available_days: string[]
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getCoaches():Observable<Coach> {
    const url = 'http://127.0.0.1:3000/coaches';

    return this.http.get<Coach>(url);
  }

  getAppointments(coach_id: number, date: string): Observable<{available_times: string[]}> {
    const url = `http://127.0.0.1:3000/appointment?coach_id=${coach_id}&date=${date}`;

    return this.http.get<{available_times: string[]}>(url);
  }

  bookAppointment(coach_id: number, name: string, email: string, date: string):Observable<{message: string}> {
    const url = `http://127.0.0.1:3000/appointment`;
    const body = {
      name,
      email,
      date,
      coach_id
    }

    return this.http.post<{message: string}>(url, body);
  }
}
