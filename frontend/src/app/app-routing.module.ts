import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employee/employees/employees.component';
import { RegistergarageComponent } from './garage/garages/garages.component';

const routes: Routes = [
  { path: 'garages', component: RegistergarageComponent },
  { path: 'employees', component: EmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
