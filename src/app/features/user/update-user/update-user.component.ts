import { Component, OnInit } from '@angular/core';
import UserService from '../services/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { UpdateUserRequest } from '../models/update-user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  
  id: string | null=null;
  paramsSubscription?: Subscription;
  editUserSubscription?: Subscription;
  user?: User;

  
constructor(private userService: UserService,
            private route: ActivatedRoute,
            private router: Router
){}

  ngOnInit(): void {
   this.paramsSubscription = this.route.paramMap.subscribe({
    next: (params) => {
      this.id=params.get('id');
    
    if(this.id){
      this.userService.getUserById(this.id)
      .subscribe({
         next: (response) => {
           this.user = response;
         }
      });
   }
  }
  });
  }

  onFormSubmit(): void{
    const updateUserRequest: UpdateUserRequest = {
      username: this.user?.username ?? '',
      phone: this.user?.phone ?? '',
      email: this.user?.email ?? ''
    };
     if(this.id){
   this.editUserSubscription= this.userService.updateUser(this.id,updateUserRequest)
       .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/user');
        }
       });
    }
  }
  onDelete(): void {
    if (this.id) {
      this.userService.deleteUser(this.id)
        .subscribe({
          next: (response) => {
          
            window.alert('Korisnik je uspešno obrisan');
  
            
            this.router.navigateByUrl('/admin/user');
          },
          error: (error) => {
            window.alert('Došlo je do greške prilikom brisanja korisnika');
          }
        });
    }
  }
  

}
