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
  selectedDate: Date | null = null;

 

  constructor(private appointmentService: AppointmentService,
              private router: Router
  ) {}

  ngOnInit() {
    this.calendarOptions = {
      
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      locale: 'sr-latn',  
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
          endTime: '20:00',
        }
      ],
      slotMinTime: '09:00:00',
      slotMaxTime: '20:00:00',
      hiddenDays: [0],
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
      slotDuration: '00:15:00',
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
      allDaySlot: false,
      events: [],
      eventClick: this.handleEventClick.bind(this),
      dateClick: this.handleDateClick.bind(this),
    
      
      buttonText: {
        today: 'Danas',
        month: 'Mesec',
        week: 'Sedmica',
        day: 'Dan',
        list: 'Lista'
      },
     
    
     
      titleFormat: { year: 'numeric', month: 'long' },
    };
    

    this.appointmentService.getAllAppointments().subscribe(appointments => {
      //console.log('Appointments received in component:', appointments);
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
    this.selectedDate = new Date(info.dateStr); 
    const modalElement = document.getElementById('addAppointmentModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show(); 
  }

  handleAddAppointment() {
    const modalElement = document.getElementById('addAppointmentModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement!);
    if (modalInstance) {
      modalInstance.hide(); 
    }
  
    this.router.navigateByUrl('/appointment/add');
    
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

  
  refreshCalendarEvents() {
    this.appointmentService.getAllAppointments().subscribe(appointments => {
      this.updateEvents(appointments);
    });
  }
  
  onDelete() {
    
    this.appointmentService.deleteAppointmentById(this.selectedEvent.id).subscribe({
      next: (response) => {
       
        const modalElement = document.getElementById('eventDetailsModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement!);
        if (modalInstance) {
          modalInstance.hide(); 
        }
  
        this.refreshCalendarEvents();
        this.router.navigateByUrl('/appointment');
      },
      error: (error) => {
        
        console.error('Greška pri brisanju termina:', error);
        alert('Došlo je do greške prilikom brisanja termina. Pokušajte ponovo.');
      }
    });
  }
  



}
