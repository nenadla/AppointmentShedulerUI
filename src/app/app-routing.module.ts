import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UslugaListComponent } from './features/usluga/usluga-list/usluga-list.component';
import { AddUslugaComponent } from './features/usluga/add-usluga/add-usluga.component';
import { EditUslugaComponent } from './features/usluga/edit-usluga/edit-usluga.component';
import { AddUserComponent } from './features/user/add-user/add-user.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UpdateUserComponent } from './features/user/update-user/update-user.component';
import { AppointmentListComponent } from './features/appointment/appointment-list/appointment-list.component';
import { AddAppointmentComponent } from './features/appointment/add-appointment/add-appointment.component';

const routes: Routes = [
{
  path: 'admin/usluga',
  component: UslugaListComponent
},
{
  path: 'admin/usluga/add',
  component: AddUslugaComponent
},
{
  path: 'admin/usluga/:id',
  component: EditUslugaComponent
},
{
  path: 'admin/user',
  component: UserListComponent
},
{
  path: 'admin/user/add',
  component: AddUserComponent
},
{
  path: 'admin/user/:id',
  component: UpdateUserComponent
},
{
  path: 'appointment',
  component: AppointmentListComponent
},
{
  path: 'appointment/add',
  component: AddAppointmentComponent
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
