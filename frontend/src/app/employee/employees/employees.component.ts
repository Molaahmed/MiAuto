import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from '../create-employee-dialog/create-employee-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { GarageService } from 'src/app/services/garage.service';

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

let EMPLOYEES: Employee[];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  animations: [onMainContentChange]
})

export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'role', 'edit'];
  dataSource = new MatTableDataSource(EMPLOYEES);
  public sideNavState: boolean = true;

  constructor(public dialog: MatDialog, private _sidenavService: SidenavService, private userService: UserService, private employeeService: EmployeeService, private garageService: GarageService) {
    this._sidenavService.sideNavState$.subscribe(res => {
      console.log(res);
      this.sideNavState = res;
    });
    this.getEmployees();
  }

  ngOnInit() {
  }

  employeesFilterPredicate(data: Employee, filter: string) {
    let name = data.first_name + ' ' + data.last_name;
    return data.id.toString().toLowerCase().includes(filter) || name.toLowerCase().includes(filter);
  }

  getEmployees() {
    this.garageService.getGarageId().then(data => {
      let garageId = data.data;

      this.employeeService.getAllByGarageId(garageId).then(data => {
        EMPLOYEES = <Employee[]> data.data;

        for (let employee of EMPLOYEES) {
          if (employee.role.includes('garage_')) {
            employee.role = employee.role.replace('garage_', '');
          }
          employee.role = employee.role.charAt(0).toUpperCase() + employee.role.substring(1);
        }
        this.dataSource = new MatTableDataSource(EMPLOYEES);
      });
    });
  }

  openCreateEmployeeDialog() {
    let dialogRef = this.dialog.open(CreateEmployeeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);
        let employee = <Employee>{
          id: EMPLOYEES[EMPLOYEES.length - 1].id + 1,
          first_name: result.firstName,
          last_name: result.lastName,
          date_of_birth: result.dateOfBirth,
          address: result.address,
          phone_number: result.phoneNumber,
          email: result.email,
          role: result.role
        }
        EMPLOYEES.push(employee);
        this.dataSource = new MatTableDataSource(EMPLOYEES);
      }
    })
  }

  openEditEmployeeDialog(employee: Employee) {
    let dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      data: {
        employee: {
          firstName: employee.first_name,
          lastName: employee.last_name,
          dateOfBirth: employee.date_of_birth,
          address: employee.address,
          phoneNumber: employee.phone_number,
          email: employee.email,
          role: employee.role
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        employee.first_name = result.firstName,
          employee.last_name = result.lastName,
          employee.date_of_birth = result.dateOfBirth,
          employee.address = result.address,
          employee.phone_number = result.phoneNumber,
          employee.email = result.email,
          employee.role = result.role
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = this.employeesFilterPredicate;
  }
}