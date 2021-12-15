import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ValidationService } from 'src/app/services/validation.service';
import { TransformService } from 'src/app/services/transform.service';

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  address: string;
  phone_number: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})

export class EditEmployeeDialogComponent implements OnInit {

  employeeForm = new FormGroup({
    first_name: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    last_name: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
    date_of_birth: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.pattern(/^[A-zÀ-ú ]+[,\s]+[\d(-\d)?]+[,\s]+[a-zA-Z .]+(?:([,\s]?)+([a-zA-Z "'.]?))+$/), Validators.required]),
    phone_number: new FormControl('', [Validators.pattern(/^[\d][\d]?[\s][\d]{3}[\s][\d]{4}$/), Validators.required]),
    email: new FormControl('', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), Validators.required]),
    role: new FormControl('', Validators.required)
  });

  public roles = [
    { id: 2, name: 'Mechanic' },
    { id: 4, name: 'Manager' }
  ];

  public currentRole = null;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    private transformService: TransformService,
    private validationService: ValidationService,
    @Inject(MAT_DIALOG_DATA) public employee: Employee) {
    this.employeeForm.setValue({
      first_name: employee.first_name,
      last_name: employee.last_name,
      date_of_birth: employee.date_of_birth,
      address: employee.address,
      phone_number: employee.phone_number,
      email: employee.email,
      role: employee.role
    });

    const toSelect = this.roles.find(role => role.name == employee.role)?.id;
    this.employeeForm.controls['role'].setValue(toSelect);
  }

  transformPhoneNumber(phoneNumber: any) {
    let transformedValue = this.transformService.transformPhoneNumber(phoneNumber);
    this.employeeForm.controls['phoneNumber'].setValue(transformedValue);
  }

  validateDOB(dob: any) {
    let isDateValid = this.validationService.isDateOfBirthValid(dob);

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
