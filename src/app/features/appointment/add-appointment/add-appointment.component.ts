declare var bootstrap: any;


import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../user/models/user.model';
import { Usluga } from '../../usluga/models/usluga.model';
import { UslugaService } from '../../usluga/services/usluga.service';
import UserService from '../../user/services/user.service';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit, OnDestroy {

  users?: User[];
  usluge?: Usluga[];
  appointmentSubscription?: Subscription;

  model = {
    startTime: new Date(),
    duration: 0,
    worker: 'Nemanja',
    serviceId: '',
    userId: ''
  };

  constructor(private userService: UserService,
              private uslugaService: UslugaService,
              private appointmentService: AppointmentService,
              private router: Router
            ) {}
 

  ngOnInit(): void {

  
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });

    this.uslugaService.getAllUsluge().subscribe({
      next: (response) => {
        this.usluge = response;
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    });
  }



  onServiceChange(serviceId: string): void {
    if (this.usluge) {
      const selectedService = this.usluge.find(service => service.id === serviceId);
      if (selectedService) {
        this.model.duration = selectedService.duration;  
      }
    } else {
      console.error('Usluge not loaded');
    }
  }

  onFormSubmit(): void {

   // console.log(this.model);
 this.appointmentSubscription = this.appointmentService.addAppointment(this.model)
  .subscribe({
    next: (response) => {
      alert("Uspešno ste dodali termin!")
      this.router.navigateByUrl('/appointment');
    },
    error: (error) => {
      alert("Dogodila se greska!!!");
    }
}) ;   
  }

  ngOnDestroy(): void {
this.appointmentSubscription?.unsubscribe();
  }

}
