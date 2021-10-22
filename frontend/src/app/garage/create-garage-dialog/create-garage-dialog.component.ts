import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-create-garage-dialog',
  templateUrl: './create-garage-dialog.component.html',
  styleUrls: ['./create-garage-dialog.component.css']
})
export class CreateGarageDialogComponent implements OnInit {

  garage = {
    name: '',
    address: '',
    city: '',
    zip: '',
    phonenumber: '',
    info: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
    image: ''
  }
  
  constructor(public dialogRef: MatDialogRef<CreateGarageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  create(){
    this.dialogRef.close(this.garage);
  }

  cancel(){
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
  }

}
