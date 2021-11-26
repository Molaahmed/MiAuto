import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
export class EditEmployeeDialogComponent implements OnInit {
  employee = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date,
    address: '',
    phoneNumber: '',
    email: '',
    role: ''
  }

  constructor(public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.employee = data.employee;
    }

  update() {
    this.dialogRef.close(this.employee);
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
