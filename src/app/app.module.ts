import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { UslugaListComponent } from './features/usluga/usluga-list/usluga-list.component';
import { AddUslugaComponent } from './features/usluga/add-usluga/add-usluga.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditUslugaComponent } from './features/usluga/edit-usluga/edit-usluga.component';
import { AddUserComponent } from './features/user/add-user/add-user.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UpdateUserComponent } from './features/user/update-user/update-user.component';
import { AddAppointmentComponent } from './features/appointment/add-appointment/add-appointment.component';
import { AppointmentListComponent } from './features/appointment/appointment-list/appointment-list.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './features/calendar/calendar/calendar.component';
import { UpdateAppointmentComponent } from './features/appointment/update-appointment/update-appointment.component';
import { HomepageComponent } from './core/components/homepage/homepage.component';



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
    AppointmentListComponent,
    CalendarComponent,
    UpdateAppointmentComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
