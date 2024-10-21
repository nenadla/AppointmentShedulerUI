import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddAppointmentRequest } from '../models/add-appointment-request.model';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';
import { UpdateAppointmentRequest } from '../models/update-appointment.model';

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

getAppointmentById(id: string): Observable<Appointment>{
  return this.http.get<Appointment>(`${environment.apiBaseUrl}/api/Appointment/${id}`);
}

updateAppointmentById(id: string, updateAppointmentRequest: UpdateAppointmentRequest): Observable<Appointment>{
  return this.http.put<Appointment>(`${environment.apiBaseUrl}/api/Appointment/${id}`, updateAppointmentRequest);
}

deleteAppointmentById(id: string): Observable<Appointment>{
  return this.http.delete<Appointment>(`${environment.apiBaseUrl}/api/Appointment/${id}`);
}

}
