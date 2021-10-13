import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.css']
})
export class CreateEmployeeDialogComponent implements OnInit {

  employee = {
    firstName: '',
    lastName: '',
    email: '',
    garage: ''
  }
  
  constructor(public dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  create(){
    this.dialogRef.close(this.employee);
  }
  
  ngOnInit(): void {
  }

}
