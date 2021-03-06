import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'
import { CreateCarDialogComponent } from '../create-car-dialog/create-car-dialog.component';
import { CarService } from 'src/app/services/car.service';
import { ClientService } from 'src/app/services/client.service';
import { GenerateCarService } from 'src/app/services/generateCar.service';

export interface Car {
  id: number;
  user_id: number;
  vin_number: string;
  owner: string;
}

export interface BackendCar {
  user_id: number;
  vin_number: string;
  plate: string;
  type: string
  fuel: string;
  make: string;
  model: string;
  engine: string;
  gear_box: string;
  air_conditioner: number;
  color: string;
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

let CARS: Car[];

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  animations: [onMainContentChange]
})
export class CarsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'vin', 'owner'];
  dataSource = new MatTableDataSource(CARS);
  public sideNavState: boolean = true;

  constructor(public dialog: MatDialog,
    private sidenavService: SidenavService,
    private carService: CarService,
    private clientService: ClientService,
    private generateCarService: GenerateCarService) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.sideNavState = res;
    });
    this.getCars();
  }

  ngOnInit() {
  }

  getCars() {
    this.carService.getAll().then(data => {
      CARS = <Car[]>data.data.data;

      this.clientService.getAll().then(data => {
        let users = <Client[]>data.data.data;

        CARS = CARS.filter(car => {
          return users.some((user) => {
            return user.id == car.user_id;
          });
        });

        for (let car of CARS) {
          let user = users.find(user => user.id == car.user_id);
          if (user != undefined) {
            car.owner = user.first_name + ' ' + user.last_name;
          }
        }
        this.dataSource = new MatTableDataSource(CARS);
      });
    });
  }

  openCreateCarDialog() {
    let dialogRef = this.dialog.open(CreateCarDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let car = this.generateCarService.generateCar(result.owner, result.vin);

        this.carService.createCar(car).then(data => {
          console.log(data.data);
          this.getCars();
        });
      }
    });
  }
}