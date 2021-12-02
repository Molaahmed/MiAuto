import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-car-dialog',
  templateUrl: './create-car-dialog.component.html',
  styleUrls: ['./create-car-dialog.component.css']
})

export class CreateCarDialogComponent implements OnInit {

  carForm = new FormGroup({
    vin: new FormControl('', [Validators.pattern(/^[\d][A-Z][\d][A-Z]{2}[\d]{2}[A-Z][\d][A-Z][\d]{7}$/), Validators.required]),
    owner: new FormControl('', Validators.required)
  });

  public owners = [
    { id: 1, name: 'Santiago Flores' },
    { id: 2, name: 'David Macias' },
    { id: 3, name: 'Victoria Castillo' },
    { id: 4, name: 'Luis Diaz' }
  ]

  constructor(
    public dialogRef: MatDialogRef<CreateCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  create(){
    if (this.carForm.valid) {
      this.dialogRef.close(this.carForm.value);
    }
  }

  cancel(){
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
  }
}
