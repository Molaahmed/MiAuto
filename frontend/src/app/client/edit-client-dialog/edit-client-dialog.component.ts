import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ValidationService } from 'src/app/services/validation.service';
import { TransformService } from 'src/app/services/transform.service';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.css']
})

export class EditClientDialogComponent implements OnInit {
  
  clientForm = new FormGroup({
    firstName: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    lastName: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    dateOfBirth: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.pattern(/^[A-zÀ-ú ]+[,\s]+[\d(-\d)?]+[,\s]+[a-zA-Z .]+(?:([,\s]?)+([a-zA-Z "'.]?))+$/), Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern(/^[\d][\d]?[\s][\d]{3}[\s][\d]{4}$/), Validators.required]),
    email: new FormControl('', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<EditClientDialogComponent>,
    private transformService: TransformService,
    private validationService: ValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.clientForm.setValue({
      firstName: data.client.firstName,
      lastName: data.client.lastName,
      dateOfBirth: data.client.dateOfBirth,
      address: data.client.address,
      phoneNumber: data.client.phoneNumber,
      email: data.client.email
    });
  }

  transformPhoneNumber(phoneNumber: any) {
    let transformedValue = this.transformService.transformPhoneNumber(phoneNumber);
    this.clientForm.controls['phoneNumber'].setValue(transformedValue);
  }

  validateDOB(dob: any) {
    let isDateValid = this.validationService.isDateValid(dob);

    if (!isDateValid) {
      this.clientForm.controls['dateOfBirth'].setErrors({ 'pattern': true });
      return;
    }

    let isOverEighteen = this.validationService.isOverEighteen(dob);

    if (!isOverEighteen) {
      this.clientForm.controls['dateOfBirth'].setErrors({ 'age': true });
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
