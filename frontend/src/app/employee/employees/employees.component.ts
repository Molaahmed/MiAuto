import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from '../create-employee-dialog/create-employee-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { GarageService } from 'src/app/services/garage.service';
import { DatePipe } from '@angular/common';

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

export interface BackendEmployee {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
  email: string;
  garage_id: number;
  role: number;
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

  constructor(public dialog: MatDialog,
    private datePipe: DatePipe,
    private sidenavService: SidenavService,
    private employeeService: EmployeeService,
    private garageService: GarageService) {
    this.sidenavService.sideNavState$.subscribe(res => {
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
        EMPLOYEES = <Employee[]>data.data;

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
        let employee = <BackendEmployee> result;

        // Convert Date of Birth
        let convertedDate = this.datePipe.transform(result.date_of_birth, 'yyyy-MM-dd');
        employee.date_of_birth = convertedDate!;

        // Set GarageId
        this.garageService.getGarageId().then(data => {
          employee.garage_id = data.data;

          this.employeeService.createEmployee(employee).then(data => {
            console.log(data.data);
            this.getEmployees();
          });
        });
      }
    });
  }

  openEditEmployeeDialog(employee: Employee) {
    let dialogRef = this.dialog.open(EditEmployeeDialogComponent, { data: employee });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let updatedEmployee = <BackendEmployee> result;

        // Convert Date of Birth
        let convertedDate = this.datePipe.transform(result.date_of_birth, 'yyyy-MM-dd');
        updatedEmployee.date_of_birth = convertedDate!;

        // Set GarageId
        this.garageService.getGarageId().then(data => {
          updatedEmployee.garage_id = data.data;

          this.employeeService.updateEmployee(employee.id, updatedEmployee).then(data => {
            console.log(data.data);
            this.getEmployees();
          });
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = this.employeesFilterPredicate;
  }
}