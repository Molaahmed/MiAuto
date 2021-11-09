import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'
import { CreateCarDialogComponent } from '../create-car-dialog/create-car-dialog.component';

export interface Car {
  id: number;
  vin: string;
  owner: string;
}

const cars: Car[] = [
  { id: 1, vin: '1A1AA11A1A1111111', owner: 'Santiago Flores' },
  { id: 2, vin: '2B2BB22B2B2222222', owner: 'David Macias' },
  { id: 3, vin: '3C3CC33C3C3333333', owner: 'Victoria Castillo' },
  { id: 4, vin: '4D4DD44D4D4444444', owner: 'Luis Diaz' }
]

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  animations: [onMainContentChange]
})
export class CarsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'vin', 'owner'];
  dataSource = new MatTableDataSource(cars);
  public sideNavState: boolean = true;

  constructor(public dialog: MatDialog, private _sidenavService: SidenavService) {
    this._sidenavService.sideNavState$.subscribe(res => {
      console.log(res);
      this.sideNavState = res;
    });
  }

  ngOnInit(): void {
  }

  openCreateCarDialog() {
    let dialogRef = this.dialog.open(CreateCarDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);
        let car = <Car>{
          id: cars[cars.length - 1].id + 1,
          vin: result.vin,
          owner: result.owner,
        }
        cars.push(car);
        this.dataSource = new MatTableDataSource(cars);
      }
    })
  }
}