import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from '../create-employee-dialog/create-employee-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from 'src/app/services/user.service';
import { ContentObserver } from '@angular/cdk/observers';

export interface Employee {
  id: number;
  name: string;
  role: string;
}

const employees: Employee[] = [
  { id: 1, name: 'Andrea Rodriguez', role: 'Manager' },
  { id: 2, name: 'Edison Garcia', role: 'Mechanic' },
  { id: 3, name: 'Alejandro Sanchez', role: 'Mechanic' },
  { id: 4, name: 'Jennifer Torres', role: 'Mechanic' }
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'role'];
  dataSource = new MatTableDataSource(employees);

  constructor(public dialog: MatDialog,private userService: UserService) { }

  ngOnInit() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.id.toString().toLowerCase().includes(filter) || data.name.toLowerCase().includes(filter);
    }
  }

  getAuthenticatedUser() {
    this.userService.user().subscribe(data => {
      console.log('user : ' , data)
    })
  }

  openCreateEmployeeDialog() {
    let dialogRef = this.dialog.open(CreateEmployeeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);
        let employee = <Employee>{
          id: employees[employees.length - 1].id + 1,
          name: result.firstName + ' ' + result.lastName,
          role: result.role
        }
        employees.push(employee);
        this.dataSource = new MatTableDataSource(employees);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
