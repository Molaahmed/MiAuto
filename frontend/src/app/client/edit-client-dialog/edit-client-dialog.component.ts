import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ValidationService } from 'src/app/services/validation.service';
import { TransformService } from 'src/app/services/transform.service';

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  address: string;
  phone_number: string;
  email: string;
  car: string;
}

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.css']
})

export class EditClientDialogComponent implements OnInit {
  
  clientForm = new FormGroup({
    first_name: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    last_name: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    date_of_birth: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.pattern(/^[A-zÀ-ú ]+[,\s]+[\d(-\d)?]+[,\s]+[a-zA-Z .]+(?:([,\s]?)+([a-zA-Z "'.]?))+$/), Validators.required]),
    phone_number: new FormControl('', [Validators.pattern(/^[\d][\d]?[\s][\d]{3}[\s][\d]{4}$/), Validators.required]),
    email: new FormControl('', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<EditClientDialogComponent>,
    private transformService: TransformService,
    private validationService: ValidationService,
    @Inject(MAT_DIALOG_DATA) public client: Client) {
    this.clientForm.setValue({
      first_name: client.first_name,
      last_name: client.last_name,
      date_of_birth: client.date_of_birth,
      address: client.address,
      phone_number: client.phone_number,
      email: client.email
    });
  }

  transformPhoneNumber(phoneNumber: any) {
    let transformedValue = this.transformService.transformPhoneNumber(phoneNumber);
    this.clientForm.controls['phone_number'].setValue(transformedValue);
  }

  validateDOB(dob: any) {
    let isDateValid = this.validationService.isDateOfBirthValid(dob);

    if (!isDateValid) {
      this.clientForm.controls['date_of_birth'].setErrors({ 'pattern': true });
      return;
    }

    let isOverEighteen = this.validationService.isOverEighteen(dob);

    if (!isOverEighteen) {
      this.clientForm.controls['date_of_birth'].setErrors({ 'age': true });
    }
  }

  update() {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
