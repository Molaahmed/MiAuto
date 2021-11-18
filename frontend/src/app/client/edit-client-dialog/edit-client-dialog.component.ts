import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.css']
})
export class EditClientDialogComponent implements OnInit {
  client = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date,
    address: '',
    phoneNumber: '',
    email: '',
    car: ''
  }

  constructor(public dialogRef: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.client = data.client;
  }

  update() {
    this.dialogRef.close(this.client);
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
