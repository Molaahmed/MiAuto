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
    {name: 'Andrea', email: 'andreameresa@gmail.com', salary: '$100', garage: 'Quito'},
    {name: 'Edison', email: 'edisonmeresa@gmail.com', salary: '$100', garage: 'Quito'}
  ];
  
  displayedColumns: string[] = ['name', 'email', 'salary', 'garage'];
  dataSource = this.employees;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateEmployeeDialog(){
    let dialogRef = this.dialog.open(CreateEmployeeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      let employee = {
        name: result.firstName,
        email: result.email,
        salary: '0$',
        garage: result.garage
      }
      this.dataSource = this.employees.concat(employee);
    })
  }

}
