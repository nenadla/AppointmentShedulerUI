import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentService } from '../../appointment/services/appointment.service';
import { Appointment } from '../../appointment/models/appointment.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  calendarOptions: any;
  //appointments?: Appointment[];

constructor(private appointmentService: AppointmentService){}


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
      slotDuration: '00:30:00',
      eventTimeFormat: { 
        hour: '2-digit',
        minute: '2-digit',
        hour12: false 
      },

      allDaySlot: false,
     
      events: [
        
        { title: 'Termin 1', start: '2024-10-17T10:00:00', end: '2024-10-17T11:00:00' },
        { title: 'Termin 2', start: '2024-10-17T12:00:00', end: '2024-10-17T13:00:00' },
      
      ],
      eventClick: this.handleEventClick, 
      dateClick: this.handleDateClick, 
    };

    this.appointmentService.getAllAppointments().subscribe(appointments => {
      this.updateEvents(appointments);
    });
 
  }
  updateEvents(appointments: Appointment[]) {
    this.calendarOptions.events = appointments.map(appointment => ({
      title: `${appointment.username} - ${appointment.serviceName}`,
      start: appointment.startTime,
      end: appointment.endTime
    }));
  }
  
  handleDateClick(info: any) {
    alert('Clicked on: ' + info.dateStr);
  }

  handleEventClick(info: any) {
    alert('Event: ' + info.event.title);
  }
}
