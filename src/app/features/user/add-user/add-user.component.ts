import { Component, OnDestroy } from '@angular/core';
import { AddUserRequest } from '../models/add-user-request.model';
import UserService from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnDestroy{

model: AddUserRequest;
private addUserSubscription?: Subscription;


constructor(private userService: UserService,
            private router: Router
){
  this.model={
    username: '',
    phone: '',
    email: ''
  };
}


onFormSubmit(){
  this.addUserSubscription = this.userService.addUser(this.model)
   .subscribe({
     next: (response) =>{
      this.router.navigateByUrl('/admin/user');
     }
   });
}


  ngOnDestroy(): void {
    this.addUserSubscription?.unsubscribe();
  }

}
