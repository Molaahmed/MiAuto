import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from '../create-employee-dialog/create-employee-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: string;
  phoneNumber : string;
  email: string;
  role: string;
}

const employees: Employee[] = [
  { id: 1, firstName: 'Andrea', lastName: 'Rodriguez', dateOfBirth: new Date('01/01/2000'), address: 'Juan León Mera, 19-36, Av. Patria', phoneNumber: '4 123 4567', email: 'andreameresa@gmail.com', role: 'Manager' },
  { id: 2, firstName: 'Edison', lastName: 'Garcia', dateOfBirth: new Date('01/01/2000'), address: 'Juan León Mera, 19-36, Av. Patria', phoneNumber: '4 123 4567', email: 'edisonmeresa@gmail.com', role: 'Mechanic' },
  { id: 3, firstName: 'Alejandro', lastName: 'Sanchez', dateOfBirth: new Date('01/01/2000'), address: 'Juan León Mera, 19-36, Av. Patria', phoneNumber: '4 123 4567', email: 'alejandromeresa@gmail.com', role: 'Mechanic' },
  { id: 4, firstName: 'Jennifer', lastName: 'Torres', dateOfBirth: new Date('01/01/2000'), address: 'Juan León Mera, 19-36, Av. Patria', phoneNumber: '4 123 4567', email: 'jennifermeresa@gmail.com', role: 'Mechanic' }
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  animations: [onMainContentChange]
})

export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'role', 'edit'];
  dataSource = new MatTableDataSource(employees);
  public sideNavState: boolean = true;

  constructor(public dialog: MatDialog, private _sidenavService: SidenavService, private userService: UserService) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res);
      this.sideNavState = res;
    });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      let name = data.firstName + ' ' + data.lastName;
      return data.id.toString().toLowerCase().includes(filter) || name.toLowerCase().includes(filter);
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
          firstName: result.firstName,
          lastName: result.lastName,
          dateOfBirth: result.dateOfBirth,
          address: result.address,
          phoneNumber: result.phoneNumber,
          email: result.email,
          role: result.role
        }
        employees.push(employee);
        this.dataSource = new MatTableDataSource(employees);
      }
    })
  }

  openEditEmployeeDialog(employee: Employee) {
    let dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      data: {
        employee: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          dateOfBirth: employee.dateOfBirth,
          address: employee.address,
          phoneNumber: employee.phoneNumber,
          email: employee.email,
          role: employee.role
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        employee.firstName = result.firstName,
        employee.lastName = result.lastName,
        employee.dateOfBirth = result.dateOfBirth,
        employee.address = result.address,
        employee.phoneNumber = result.phoneNumber,
        employee.email = result.email,
        employee.role = result.role
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}