import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/Appointment.model';
import { AppointmentService } from '../services/appointment.service';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit{

 appoimtments?: Appointment[]; 

constructor(private appointmentService: AppointmentService){}

  ngOnInit(): void {
    this.appointmentService.getAllAppointments()
    .subscribe({
      next: (response) => {
        this.appoimtments=response;
      }
    })
  }
  
}
