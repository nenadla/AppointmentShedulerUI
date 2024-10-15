import { Component, OnDestroy } from '@angular/core';
import { AddUslugaRequest } from '../models/add-usluga-request.model';
import { UslugaService } from '../services/usluga.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-usluga',
  templateUrl: './add-usluga.component.html',
  styleUrls: ['./add-usluga.component.css']
})
export class AddUslugaComponent implements OnDestroy{

model: AddUslugaRequest;
private addUslugaSubscription?: Subscription;

constructor(private uslugaService: UslugaService,
            private router: Router
){
  this.model={
    name: '',
    duration: 0,
    price: 0
  };
}
  

onFormSubmit(){
this.addUslugaSubscription=this.uslugaService.addUsluga(this.model)
.subscribe({
  next: (response) => {
    this.router.navigateByUrl('/admin/usluga');
  }
});
}

ngOnDestroy(): void {
  this.addUslugaSubscription?.unsubscribe();
}


}
