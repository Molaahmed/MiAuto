import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ValidationService } from 'src/app/services/validation.service';
import { TransformService } from 'src/app/services/transform.service';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})

export class EditEmployeeDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    private transformService: TransformService,
    private validationService: ValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employeeForm.setValue({
      firstName: data.employee.firstName,
      lastName: data.employee.lastName,
      dateOfBirth: data.employee.dateOfBirth,
      address: data.employee.address,
      phoneNumber: data.employee.phoneNumber,
      email: data.employee.email,
      role: data.employee.role
    });
  }

  transformPhoneNumber(phoneNumber: any) {
    let transformedValue = this.transformService.transformPhoneNumber(phoneNumber);
    this.employeeForm.controls['phoneNumber'].setValue(transformedValue);
  }

  validateDOB(dob: any) {
    let isDateValid = this.validationService.isDateValid(dob);

    if (!isDateValid) {
      this.employeeForm.controls['dateOfBirth'].setErrors({ 'pattern': true });
      return;
    }

    let isOverEighteen = this.validationService.isOverEighteen(dob);

    if (!isOverEighteen) {
      this.employeeForm.controls['dateOfBirth'].setErrors({ 'age': true });
    }
  }

  update() {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
