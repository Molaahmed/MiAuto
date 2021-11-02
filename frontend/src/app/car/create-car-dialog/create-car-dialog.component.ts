import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-create-car-dialog',
  templateUrl: './create-car-dialog.component.html',
  styleUrls: ['./create-car-dialog.component.css']
})
export class CreateCarDialogComponent implements OnInit {
  car = {
    vin: '',
    owner: ''
  }

  public owners = [
    { id: 1, name: 'Santiago Flores' },
    { id: 2, name: 'David Macias' },
    { id: 3, name: 'Victoria Castillo' },
    { id: 4, name: 'Luis Diaz' }
  ]

  constructor(public dialogRef: MatDialogRef<CreateCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  create(){
    this.dialogRef.close(this.car);
  }

  cancel(){
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
  }
}
