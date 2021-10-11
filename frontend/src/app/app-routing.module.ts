import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistergarageComponent } from './registergarage/registergarage.component';

const routes: Routes = [
  { path: 'garages', component: RegistergarageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
