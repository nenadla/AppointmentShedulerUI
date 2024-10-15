import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddUserRequest } from '../models/add-user-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { UpdateUserRequest } from '../models/update-user.model';


@Injectable({
  providedIn: 'root'
})
export default class UserService {

  constructor(private http: HttpClient) { }

addUser(addUser: AddUserRequest): Observable<void>{
 return this.http.post<void>(`${environment.apiBaseUrl}/api/User`, addUser);
}

getAllUsers(): Observable<User[]>{
return this.http.get<User[]>(`${environment.apiBaseUrl}/api/User`);
}

getUserById(id: string): Observable<User>{
 return this.http.get<User>(`${environment.apiBaseUrl}/api/User/${id}`);
}

updateUser(id: string, updateUser: UpdateUserRequest): Observable<User>{
  return this.http.put<User>(`${environment.apiBaseUrl}/api/User/${id}`,updateUser);
}

deleteUser(id: string): Observable<User>{
  return this.http.delete<User>(`${environment.apiBaseUrl}/api/User/${id}`);
}

}
