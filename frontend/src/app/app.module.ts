import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';

import { NavbarComponent } from './shared/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employee/employees/employees.component';
import { CreateEmployeeDialogComponent } from './employee/create-employee-dialog/create-employee-dialog.component';
import { ClientsComponent } from './client/clients/clients.component';
import { CreateClientDialogComponent } from './client/create-client-dialog/create-client-dialog.component';
import { CarsComponent } from './car/cars/cars.component';
import { CreateCarDialogComponent } from './car/create-car-dialog/create-car-dialog.component';

import { SidenavService } from './services/navbar.service';

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
    CreateCarDialogComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [ SidenavService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
