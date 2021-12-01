import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { ValidationService } from 'src/app/services/validation.service';
import { TransformService } from 'src/app/services/transform.service';

@Component({
  selector: 'app-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.css']
})
export class CreateEmployeeDialogComponent implements OnInit {

  employeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    lastName: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    dateOfBirth: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.pattern(/^[A-zÀ-ú ]+[,\s]+[\d(-\d)?]+[,\s]+[a-zA-Z .]+(?:([,\s]?)+([a-zA-Z "'.]?))+$/), Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern(/^[\d][\d]?[\s][\d]{3}[\s][\d]{4}$/), Validators.required]),
    email: new FormControl('', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), Validators.required]),
    role: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
    private validationService: ValidationService,
    private tranformService: TransformService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  create() {
    if (this.employeeForm.valid){
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  transformPhoneNumber(event: any) {
    let transformedValue = this.tranformService.transformPhoneNumber(event);
    this.employeeForm.controls['phoneNumber'].setValue(transformedValue);
  }

  validateDOB(dob: any) {   
    let isDateValid = this.validationService.isDateValid(dob);

    if (!isDateValid) {
      this.employeeForm.controls['dateOfBirth'].setErrors({'pattern' : true});
      return;
    }

    let isOverEighteen = this.validationService.isOverEighteen(dob);

    if (!isOverEighteen) {
      this.employeeForm.controls['dateOfBirth'].setErrors({'age' : true});
    }
  }
}
