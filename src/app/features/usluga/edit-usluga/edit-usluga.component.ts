import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UslugaService } from '../services/usluga.service';
import { Usluga } from '../models/usluga.model';
import { UpdateUslugaRequest } from '../models/update-usluga-request.model';

@Component({
  selector: 'app-edit-usluga',
  templateUrl: './edit-usluga.component.html',
  styleUrls: ['./edit-usluga.component.css']
})
export class EditUslugaComponent implements OnInit, OnDestroy{

  id: string | null=null;
  paramsSubscription?: Subscription;
  editUslugaSubscription?: Subscription;
  usluga?: Usluga;

  constructor(private route: ActivatedRoute,
              private uslugaService: UslugaService,
              private router: Router
  ){}
  

  ngOnInit(): void {
   this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id=params.get('id');

        if(this.id){
           this.uslugaService.getUslugaById(this.id)
           .subscribe({
              next: (response) => {
                this.usluga = response;
              }
           });
        }
      }
    });
  }

  onFormSubmit(): void{
    const updateUslugaRequest: UpdateUslugaRequest = {
      name: this.usluga?.name ?? '',
      duration: this.usluga?.duration ?? 0,
      price: this.usluga?.price ?? 0
    };
      if(this.id){
       this.editUslugaSubscription = this.uslugaService.updateUsluga(this.id, updateUslugaRequest)
        .subscribe({
          next: (response) => {
              this.router.navigateByUrl('/admin/usluga');
          }
        });
      }
    
  }

  onDelete(): void{
    if(this.id){
    this.uslugaService.deleteUsluga(this.id).subscribe({
      next: (response) => {
        window.alert('Usluga je uspešno obrisana');
        this.router.navigateByUrl('/admin/usluga');
      },
      error: (error) => {
            
        window.alert('Došlo je do greške prilikom brisanja usluge');
      }
    });
  }
}

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editUslugaSubscription?.unsubscribe();
  }

}
