import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-edit-appointment-dialog',
  templateUrl: './edit-appointment-dialog.component.html',
  styleUrls: ['./edit-appointment-dialog.component.css']
})

export class EditAppointmentDialogComponent implements OnInit {
  appointment = {
    client: '',
    employee: '',
    vin: '',
    date: new Date,
    startingTime: '',
    endingTime: ''
  }

  appointmentForm = new FormGroup({
    client: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
    vin: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    startingTime: new FormControl('', [Validators.pattern(/^[\d][\d]?:[\d][\d]$/), Validators.required]),
    endingTime: new FormControl('', [Validators.pattern(/^[\d][\d]?:[\d][\d]$/), Validators.required])
  })

  public clients = [
    { id: 1, name: 'Santiago Flores' },
    { id: 2, name: 'David Macias' },
    { id: 3, name: 'Victoria Castillo' },
    { id: 4, name: 'Luis Diaz' }
  ];

  public employees = [
    { id: 1, name: 'Andrea Rodriguez' },
    { id: 2, name: 'Edison Garcia' },
    { id: 3, name: 'Alejandro Sanchez' },
    { id: 4, name: 'Jennifer Torres' }
  ];

  public vins = [
    { id: 1, number: '1A1AA11A1A1111111' },
    { id: 2, number: '2B2BB22B2B2222222' },
    { id: 3, number: '3C3CC33C3C3333333' },
    { id: 4, number: '4D4DD44D4D4444444' }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditAppointmentDialogComponent>,
    private validationService: ValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.appointmentForm.setValue({
      client: data.appointment.client,
      employee: data.appointment.employee,
      vin: data.appointment.vin,
      date: data.appointment.date,
      startingTime: data.appointment.startingTime,
      endingTime: data.appointment.endingTime
    });
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
