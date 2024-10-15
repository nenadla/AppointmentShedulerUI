import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddAppointmentRequest } from '../models/add-appointment-request.model';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment.model';
import { environment } from 'src/environments/environment';

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

}