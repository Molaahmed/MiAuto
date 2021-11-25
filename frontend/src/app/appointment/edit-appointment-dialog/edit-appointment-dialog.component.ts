import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

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

  constructor(public dialogRef: MatDialogRef<EditAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.appointment = data.appointment;
  }

  update() {
    this.dialogRef.close(this.appointment);
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
