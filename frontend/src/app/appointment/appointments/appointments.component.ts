import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'
import { CreateAppointmentDialogComponent } from '../create-appointment-dialog/create-appointment-dialog.component';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

export interface Appointment {
  id: number;
  client: string;
  employee: string;
  vin: string;
  date: Date;
  startingTime: string;
  endingTime: string;
}

const appointments: Appointment[] = [
  { id: 1, client: 'Santiago Flores', employee: 'Alejandro Sanchez', vin: '1A1AA11A1A1111111', date: new Date(2022, 0, 1), startingTime: '9:00', endingTime: '11:00' },
  { id: 2, client: 'David Macias', employee: 'Edison Garcia', vin: '2B2BB22B2B2222222', date: new Date(2022, 1, 1), startingTime: '9:00', endingTime: '12:00' },
  { id: 3, client: 'Victoria Castillo', employee: 'Alejandro Sanchez', vin: '3C3CC33C3C3333333', date: new Date(2022, 2, 1), startingTime: '13:00', endingTime: '14:00' },
  { id: 4, client: 'Luis Diaz', employee: 'Jennifer Torres', vin: '4D4DD44D4D4444444', date: new Date(2022, 3, 1), startingTime: '15:00', endingTime: '17:00' }
]

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  animations: [onMainContentChange]
})
export class AppointmentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'client', 'employee', 'vin', 'date', 'time'];
  dataSource = new MatTableDataSource(appointments);
  public sideNavState: boolean = true;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() { return this.filterForm.get('fromDate')!.value; }
  get toDate() { return this.filterForm.get('toDate')!.value; }
  
  constructor(public dialog: MatDialog, private _sidenavService: SidenavService, public datePipe: DatePipe) {
    this._sidenavService.sideNavState$.subscribe(res => {
      console.log(res);
      this.sideNavState = res;
    });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter) =>{
      if (this.fromDate && this.toDate) {
        return data.date >= this.fromDate && data.date <= this.toDate;
      }
      return true;
    }
  }

  dateRangeChange() {
    // Just to trigger the filter.
    this.dataSource.filter = '' + Math.random();
  }

  clearStartDate() {
    this.filterForm.reset();
    this.dateRangeChange();
  }

  openCreateAppointmentDialog() {

  }
}
