import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employee/employees/employees.component';
import { ClientsComponent } from './client/clients/clients.component';
import { CarsComponent } from './car/cars/cars.component';

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'cars', component: CarsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
