import { Component, OnInit } from '@angular/core';
import { UslugaService } from '../services/usluga.service';
import { Usluga } from '../models/usluga.model';

@Component({
  selector: 'app-usluga-list',
  templateUrl: './usluga-list.component.html',
  styleUrls: ['./usluga-list.component.css']
})
export class UslugaListComponent implements OnInit{

   usluge?: Usluga[];

   
  constructor(private uslugaService: UslugaService) {}


  ngOnInit(): void {
    this.uslugaService.getAllUsluge()
    .subscribe({
      next: (response) => {
         this.usluge= response;
      }
    });
  }



}
