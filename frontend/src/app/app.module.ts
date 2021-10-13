import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { RegistergarageComponent } from './garage/garages/garages.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CreateGarageDialogComponent } from './garage/create-garage-dialog/create-garage-dialog.component';
import { EditGarageDialogComponent } from './garage/edit-garage-dialog/edit-garage-dialog.component';
import { EmployeesComponent } from './employee/employees/employees.component';
import { CreateEmployeeDialogComponent } from './employee/create-employee-dialog/create-employee-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistergarageComponent,
    NavbarComponent,
    CreateGarageDialogComponent,
    EditGarageDialogComponent,
    EmployeesComponent,
    CreateEmployeeDialogComponent,
  ],
  entryComponents: [CreateGarageDialogComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
