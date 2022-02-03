import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from 'src/app/services/car.service';
import { ClientService } from 'src/app/services/client.service';

import { ValidationService } from 'src/app/services/validation.service';

export interface Appointment {
  id: number;
  user_id: number;
  garage_id: number;
  vin_number: string;
  description: string;
  date: Date;
  startingTime: string;
  endingTime: string;
  client: string;
}

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
  selector: 'app-edit-appointment-dialog',
  templateUrl: './edit-appointment-dialog.component.html',
  styleUrls: ['./edit-appointment-dialog.component.css']
})

export class EditAppointmentDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EditAppointmentDialogComponent>,
    private validationService: ValidationService,
    private clientService: ClientService,
    private carService: CarService,
    @Inject(MAT_DIALOG_DATA) public appointment: Appointment) {
    this.appointmentForm.setValue({
      user_id: appointment.user_id,
      vin_number: appointment.vin_number,
      date: appointment.date,
      startingTime: appointment.startingTime,
      endingTime: appointment.endingTime
    });
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

  getClients() {
    this.clientService.getAll().then(data => {
      this.CLIENTS = <Client[]> data.data.data;
    });
  }

  getCars() {
    this.carService.getAll().then(data => {
      this.CARS = <Car[]> data.data.data;
    });
  }


  update() {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
