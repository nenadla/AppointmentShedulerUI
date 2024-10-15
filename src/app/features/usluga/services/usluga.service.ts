import { Injectable } from '@angular/core';
import { AddUslugaRequest } from '../models/add-usluga-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usluga } from '../models/usluga.model';
import { environment } from 'src/environments/environment';
import { UpdateUslugaRequest } from '../models/update-usluga-request.model';

@Injectable({
  providedIn: 'root'
})
export class UslugaService {

  constructor(private http: HttpClient) { }

  addUsluga(model: AddUslugaRequest): Observable<void>{
       return this.http.post<void>(`${environment.apiBaseUrl}/api/Service`, model);
  }

  getAllUsluge(): Observable<Usluga[]>{
     return this.http.get<Usluga[]>(`${environment.apiBaseUrl}/api/Service`);
  }

  getUslugaById(id: string): Observable<Usluga>{
    return this.http.get<Usluga>(`${environment.apiBaseUrl}/api/Service/${id}`);
  }

  updateUsluga(id:string, model: UpdateUslugaRequest): Observable<Usluga>{
    return this.http.put<Usluga>(`${environment.apiBaseUrl}/api/Service/${id}`, model);
  }

  deleteUsluga(id: string): Observable<Usluga>{
    return this.http.delete<Usluga>(`${environment.apiBaseUrl}/api/Service/${id}`);
  }

}
