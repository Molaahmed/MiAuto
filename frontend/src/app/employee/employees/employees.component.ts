import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from '../create-employee-dialog/create-employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees = [
    { id: 1, name: 'Andrea Rodriguez', role: 'Manager' },
    { id: 2, name: 'Edison Garcia', role: 'Mechanic' },
    { id: 3, name: 'Alejandro Sanchez', role: 'Mechanic' },
    { id: 4, name: 'Jennifer Torres', role: 'Mechanic' }
  ];

  displayedColumns: string[] = ['id', 'name', 'role'];
  dataSource = this.employees;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateEmployeeDialog() {
    let dialogRef = this.dialog.open(CreateEmployeeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);
        let employee = {
          id: this.employees[this.employees.length - 1].id + 1,
          name: result.firstName + ' ' + result.lastName,
          role: result.role
        }
        this.dataSource = this.employees.concat(employee);
      }
    })
  }
}
