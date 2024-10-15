import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { UslugaListComponent } from './features/usluga/usluga-list/usluga-list.component';
import { AddUslugaComponent } from './features/usluga/add-usluga/add-usluga.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { EditUslugaComponent } from './features/usluga/edit-usluga/edit-usluga.component';
import { AddUserComponent } from './features/user/add-user/add-user.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UpdateUserComponent } from './features/user/update-user/update-user.component';
import { AddAppointmentComponent } from './features/appointment/add-appointment/add-appointment.component';
import { AppointmentListComponent } from './features/appointment/appointment-list/appointment-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UslugaListComponent,
    AddUslugaComponent,
    EditUslugaComponent,
    AddUserComponent,
    UserListComponent,
    UpdateUserComponent,
    AddAppointmentComponent,
    AppointmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
