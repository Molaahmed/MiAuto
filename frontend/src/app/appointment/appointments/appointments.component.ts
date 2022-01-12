import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'
import { CreateAppointmentDialogComponent } from '../create-appointment-dialog/create-appointment-dialog.component';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { EditAppointmentDialogComponent } from '../edit-appointment-dialog/edit-appointment-dialog.component';
import { GarageService } from 'src/app/services/garage.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ClientService } from 'src/app/services/client.service';

export interface Appointment {
  id: number;
  user_id: number;
  garage_id: number;
  vin_number: string;
  description: string;
  date: Date;
  startingTime: string;
  endingTime: string;
  client: string;
}

export interface BackendAppointment {
  id: number;
  user_id: number;
  garage_id: number;
  vin_number: string;
  description: string;
  date: string;
  startingTime: string;
  endingTime: string;
}

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  address: string;
  phone_number: string;
  email: string;
}

let APPOINTMENTS: Appointment[];
let unfilteredAppointments: Appointment[];

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  animations: [onMainContentChange]
})
export class AppointmentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'client', 'vin', 'date', 'time', 'edit'];
  dataSource = new MatTableDataSource(APPOINTMENTS);
  public sideNavState: boolean = true;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() { return this.filterForm.get('fromDate')!.value; }
  get toDate() { return this.filterForm.get('toDate')!.value; }
  
  constructor(public dialog: MatDialog,
    public datePipe: DatePipe,
    private sidenavService: SidenavService,
    private appointmentService: AppointmentService,
    private garageService: GarageService,
    private clientService: ClientService) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.sideNavState = res;
    });
    this.getAppointments();
  }

  ngOnInit() {
  }

  getAppointments() {
    this.garageService.getGarageId().then(data => {
      let garageId = data.data;

      this.appointmentService.getAllByGarageId(garageId).then(data => {
        APPOINTMENTS = <Appointment[]>data.data;

        this.clientService.getAll().then(data => {
          let users = <Client[]>data.data.data;
          
          APPOINTMENTS = APPOINTMENTS.filter(appointment => {
            return users.some((user) => {
              return user.id == appointment.user_id
            });
          });

          for (let appointment of APPOINTMENTS) {
            let user = users.find(user => user.id == appointment.user_id);
            if (user != undefined) {
              appointment.client = user.first_name + ' ' + user.last_name;
            }

            // Formatting startingTime
            if (appointment.startingTime.charAt(0) == '0') {
              appointment.startingTime = appointment.startingTime.substring(1);
            }
            appointment.startingTime = appointment.startingTime.substring(0, appointment.startingTime.length - 3);

            // Formatting endingTime
            if (appointment.endingTime.charAt(0) == '0') {
              appointment.endingTime = appointment.endingTime.substring(1);
            }
            appointment.endingTime = appointment.endingTime.substring(0, appointment.endingTime.length - 3);
          }
          this.dataSource = new MatTableDataSource(APPOINTMENTS);
        });
      });
    });
  }

  dateRangeChange() {
    unfilteredAppointments = APPOINTMENTS;
    APPOINTMENTS = APPOINTMENTS.filter(appointment => {
      return appointment.date >= this.fromDate && appointment.date <= this.toDate
    });
    this.dataSource = new MatTableDataSource(APPOINTMENTS);
  }

  clearStartDate() {
    this.filterForm.reset();
    this.dataSource.filter = '';

    APPOINTMENTS = unfilteredAppointments;
    this.dataSource = new MatTableDataSource(APPOINTMENTS);
  }

  openCreateAppointmentDialog() {
    let dialogRef = this.dialog.open(CreateAppointmentDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let appointment = <BackendAppointment> result;

        // Add description to appointment
        appointment.description = 'hello';

        // Convert Date
        let convertedDate = this.datePipe.transform(result.date, 'yyyy-MM-dd');
        appointment.date = convertedDate!;

        // Set GarageId
        this.garageService.getGarageId().then(data => {
          appointment.garage_id = data.data;

          this.appointmentService.createAppointment(appointment).then(data => {
            console.log(data.data);
            this.getAppointments();
          });
        });
      }
    });
  }

  openEditAppointmentDialog(appointment: Appointment) {
    let dialogRef = this.dialog.open(EditAppointmentDialogComponent, { data: appointment });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let updatedAppointment = <BackendAppointment> result;

        updatedAppointment.id = appointment.id;
        updatedAppointment.description = appointment.description;

        // Convert Date
        let convertedDate = this.datePipe.transform(result.date, 'yyyy-MM-dd');
        updatedAppointment.date = convertedDate!;

        // Set GarageId
        this.garageService.getGarageId().then(data => {
          updatedAppointment.garage_id = data.data;

          this.appointmentService.updateAppointment(updatedAppointment).then(data => {
            console.log(data.data);
            this.getAppointments();
          });
        });
      }
    });
  }
}
