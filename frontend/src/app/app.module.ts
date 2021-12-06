import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';

import { NavbarComponent } from './shared/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employee/employees/employees.component';
import { CreateEmployeeDialogComponent } from './employee/create-employee-dialog/create-employee-dialog.component';
import { ClientsComponent } from './client/clients/clients.component';
import { CreateClientDialogComponent } from './client/create-client-dialog/create-client-dialog.component';
import { CarsComponent } from './car/cars/cars.component';
import { CreateCarDialogComponent } from './car/create-car-dialog/create-car-dialog.component';

import { SidenavService } from './services/navbar.service';
import { ValidationService } from './services/validation.service';
import { TransformService } from './services/transform.service';

import { EditEmployeeDialogComponent } from './employee/edit-employee-dialog/edit-employee-dialog.component';
import { EditClientDialogComponent } from './client/edit-client-dialog/edit-client-dialog.component';

import { AppointmentsComponent } from './appointment/appointments/appointments.component';
import { CreateAppointmentDialogComponent } from './appointment/create-appointment-dialog/create-appointment-dialog.component';
import { EditAppointmentDialogComponent } from './appointment/edit-appointment-dialog/edit-appointment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    EmployeesComponent,
    CreateEmployeeDialogComponent,
    ClientsComponent,
    CreateClientDialogComponent,
    CarsComponent,
    CreateCarDialogComponent,
    EditEmployeeDialogComponent,
    EditClientDialogComponent,
    AppointmentsComponent,
    CreateAppointmentDialogComponent,
    EditAppointmentDialogComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ SidenavService, ValidationService, TransformService, DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
