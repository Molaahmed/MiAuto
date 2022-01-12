import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from 'src/app/services/car.service';
import { ClientService } from 'src/app/services/client.service';

import { ValidationService } from 'src/app/services/validation.service';

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
}

export interface Car {
  id: number;
  user_id: number;
  vin_number: string;
}

@Component({
  selector: 'app-create-appointment-dialog',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.css']
})
export class CreateAppointmentDialogComponent implements OnInit {

  appointmentForm = new FormGroup({
    user_id: new FormControl('', Validators.required),
    vin_number: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    startingTime: new FormControl('', [Validators.pattern(/^[\d][\d]?:[\d][\d]$/), Validators.required]),
    endingTime: new FormControl('', [Validators.pattern(/^[\d][\d]?:[\d][\d]$/), Validators.required])
  });

  public CLIENTS: Client[] = [];
  public CARS: Car[] = [];
  public unfilteredCars: Car[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
    private validationService: ValidationService,
    private clientService: ClientService,
    private carService: CarService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.getCars();
      this.getClients();
    }

  validateDate(event: any) {
    let isDateValid = this.validationService.isAppointmentDateValid(event);

    if (!isDateValid) {
      this.appointmentForm.controls['date'].setErrors({ 'pattern': true });
      return;
    }

    let isAppointmentInTheFuture = this.validationService.isAppointmentInTheFuture(event);

    if (!isAppointmentInTheFuture) {
      this.appointmentForm.controls['date'].setErrors({ 'past': true });
    }
  }

  validateTimes(times: any) {
    let startingTime: string = times.startingTime;
    let endingTime: string = times.endingTime;

    if (startingTime != '' && endingTime != '') {
      let areTimesValid = this.validationService.areTimesValid(startingTime, endingTime);

      let startingTimeHasError = this.appointmentForm.get('startingTime')?.hasError('moment');
      let endingTimeHasError = this.appointmentForm.get('endingTime')?.hasError('moment');

      if (!areTimesValid) {
        this.appointmentForm.controls['startingTime'].setErrors({ 'moment': true });
        this.appointmentForm.controls['endingTime'].setErrors({ 'moment': true });
      }
      else if (areTimesValid && (startingTimeHasError || endingTimeHasError)) {
        this.appointmentForm.controls['startingTime'].setErrors({ 'moment': null });
        this.appointmentForm.controls['endingTime'].setErrors({ 'moment': null });

        this.appointmentForm.controls['startingTime'].updateValueAndValidity();
        this.appointmentForm.controls['endingTime'].updateValueAndValidity();
      }
    }
  }

  create() {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  getClients() {
    this.clientService.getAll().then(data => {
      this.CLIENTS = <Client[]> data.data.data;
      this.CLIENTS = this.CLIENTS.filter(client => {
        return this.CARS.some(car => {
          return client.id == car.user_id
        });
      });
    });
  }

  getCars() {
    this.carService.getAll().then(data => {
      this.CARS = <Car[]> data.data.data;
    });
  }

  getCarsByClientId(clientId: number){
    this.unfilteredCars = this.CARS;
    this.CARS = this.CARS.filter(car => {
      return car.user_id == clientId
    });
  }

  ngOnInit(): void {
    this.appointmentForm.controls['user_id'].valueChanges.subscribe(value => {
      if (this.unfilteredCars.length != 0){
        this.CARS = this.unfilteredCars;
      }
      this.getCarsByClientId(value);
    });
  }
}
