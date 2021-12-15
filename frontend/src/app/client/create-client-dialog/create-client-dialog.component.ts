import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ValidationService } from 'src/app/services/validation.service';
import { TransformService } from 'src/app/services/transform.service';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.css']
})

export class CreateClientDialogComponent implements OnInit {

  clientForm = new FormGroup({
    first_name: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    last_name: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    date_of_birth: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.pattern(/^[A-zÀ-ú ]+[,\s]+[\d(-\d)?]+[,\s]+[a-zA-Z .]+(?:([,\s]?)+([a-zA-Z "'.]?))+$/), Validators.required]),
    phone_number: new FormControl('', [Validators.pattern(/^[\d][\d]?[\s][\d]{3}[\s][\d]{4}$/), Validators.required]),
    email: new FormControl('', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<CreateClientDialogComponent>,
    private validationService: ValidationService,
    private transformService: TransformService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  transformPhoneNumber(event: any) {
    let transformedValue = this.transformService.transformPhoneNumber(event);
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

  create() {
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
