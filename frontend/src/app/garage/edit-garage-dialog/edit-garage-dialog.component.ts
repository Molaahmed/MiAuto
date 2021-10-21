import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-edit-garage-dialog',
  templateUrl: './edit-garage-dialog.component.html',
  styleUrls: ['./edit-garage-dialog.component.css']
})
export class EditGarageDialogComponent implements OnInit {

  garage = {
    name: '',
    address: '',
    city: '',
    zip: '',
    phonenumber: '',
    info: '',
    image: ''
  }
  
  constructor(public dialogRef: MatDialogRef<EditGarageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.garage = data.garage;
    }

  saveChanges(){
    this.dialogRef.close(this.garage);
  }

  cancel(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
