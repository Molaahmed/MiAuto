import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.css']
})
export class CreateClientDialogComponent implements OnInit {
  client = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date,
    address: '',
    phoneNumber: '',
    email: ''
  }

  constructor(public dialogRef: MatDialogRef<CreateClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  create() {
    this.dialogRef.close(this.client);
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
