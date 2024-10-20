import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit, OnDestroy{

  id: string | null=null;
  paramsSubscription?: Subscription;

  constructor(private appointmentService: AppointmentService,
              private route: ActivatedRoute
  ){} 

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id=params.get('id'); 
  }
});
}

ngOnDestroy(): void {
  this.paramsSubscription?.unsubscribe();
}


}

