declare var bootstrap: any;

import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentService } from '../../appointment/services/appointment.service';
import { Appointment } from '../../appointment/models/appointment.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: any;

  // Dodaj definiciju selectedEvent
  selectedEvent: any = null;
 

  constructor(private appointmentService: AppointmentService,
              private router: Router
  ) {}

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      locale: 'sr',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay,dayGridMonth',
      },
      height: 'auto',
      businessHours: [
        {
          daysOfWeek: [1, 2, 3, 4, 5, 6],
          startTime: '09:00',
          endTime: '20:00'
        }
      ],
      slotMinTime: '09:00:00',
      slotMaxTime: '20:00:00',
      hiddenDays: [0],
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },
      slotDuration: '00:15:00',
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },
      allDaySlot: false,
      events: [],
      eventClick: this.handleEventClick.bind(this), 
      dateClick: this.handleDateClick.bind(this),
    };

    this.appointmentService.getAllAppointments().subscribe(appointments => {
      this.updateEvents(appointments);
    });
  }

  updateEvents(appointments: Appointment[]) {
    this.calendarOptions.events = appointments.map(appointment => ({
      title: `${appointment.username} - ${appointment.serviceName}`,
      start: appointment.startTime,
      end: appointment.endTime,
      extendedProps: {
        username: appointment.username,
        serviceName: appointment.serviceName,
        counter: appointment.counter,
        edited: appointment.edited,
        cancelled: appointment.cancelled,
        appointmentId: appointment.appointmentId
      }
    }));
  }

  handleDateClick(info: any) {
    alert('Clicked on: ' + info.dateStr);
  }

  handleEventClick(info: any) {
        this.selectedEvent = {
          title: info.event.title,
          username: info.event.extendedProps.username,
          serviceName: info.event.extendedProps.serviceName,
          counter: info.event.extendedProps.counter,
          edited: info.event.extendedProps.edited,
          cancelled: info.event.extendedProps.cancelled,
          time: info.event.start.toLocaleString('sr-RS', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })+'h' + ' - ' + info.event.end.toLocaleString('sr-RS', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })+'h',
          id: info.event.extendedProps.appointmentId
        };
        const modalElement = document.getElementById('eventDetailsModal');
        const modal = new bootstrap.Modal(modalElement!);
        modal.show();
    }

  
  handleEditClick(){
      
    const modalElement = document.getElementById('eventDetailsModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement!);
    if (modalInstance) {
      modalInstance.hide(); 
    }
    this.router.navigate(['/appointment', this.selectedEvent.id]);
  }



}
