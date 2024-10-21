import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import UserService from '../../user/services/user.service';
import { UslugaService } from '../../usluga/services/usluga.service';
import { User } from '../../user/models/user.model';
import { Usluga } from '../../usluga/models/usluga.model';
import { UpdateAppointmentRequest } from '../models/update-appointment.model';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit, OnDestroy{

  id: string | null=null;
  paramsSubscription?: Subscription;
  editAppointmentSubscription?: Subscription;
  appointment?: Appointment;
  users?: User[];
  usluge?: Usluga[];

  constructor(private userService: UserService,
              private uslugaService: UslugaService,
              private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private router: Router
  ){} 

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

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id=params.get('id'); 

        if(this.id){
          this.appointmentService.getAppointmentById(this.id)
          .subscribe({
            next: (response) => {
              this.appointment = response;
            }
         });
        }
  }
});
}

onFormSubmit(){
  const updateAppointmetRequest: UpdateAppointmentRequest = {
    userId: this.appointment?.userId ?? '',
    serviceId: this.appointment?.serviceId ?? '',
    startTime: this.appointment?.startTime  ?? new Date(),
    duration: this.appointment?.duration ?? 0,
    worker: this.appointment?.worker ?? ''
  };
  if(this.id){
  this.editAppointmentSubscription=this.appointmentService.updateAppointmentById(this.id, updateAppointmetRequest)
  .subscribe({
    next: (response) => {
      this.router.navigateByUrl('/appointment');
    }
  });
  }
}

ngOnDestroy(): void {
  this.paramsSubscription?.unsubscribe();
  this.editAppointmentSubscription?.unsubscribe();
}


}

