import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';

export interface Client {
    id: number;
    first_name: string;
    last_name: string;
}

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

  public CLIENTS: Client[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateCarDialogComponent>,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.getClients();
    }

  create(){
    if (this.carForm.valid) {
      this.dialogRef.close(this.carForm.value);
    }
  }

  cancel(){
    this.dialogRef.close();
  }

  getClients() {
    this.clientService.getAll().then(data => {
      this.CLIENTS = <Client[]> data.data.data;
    });
  }
  
  ngOnInit(): void {
  }
}
