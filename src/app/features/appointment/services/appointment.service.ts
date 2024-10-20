import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddAppointmentRequest } from '../models/add-appointment-request.model';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

addAppointment(addAppointment: AddAppointmentRequest): Observable<void>{
  return this.http.post<void>(`${environment.apiBaseUrl}/api/Appointment`, addAppointment);
}

getAllAppointments(): Observable<Appointment[]>{
  return this.http.get<Appointment[]>(`${environment.apiBaseUrl}/api/Appointment`);
}

getAppointmentBiId(id: string): Observable<Appointment>{
  return this.http.get<Appointment>(`${environment.apiBaseUrl}/api/Appointment/${id}`);
}

}
