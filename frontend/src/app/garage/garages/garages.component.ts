import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CreateGarageDialogComponent } from '../create-garage-dialog/create-garage-dialog.component';
import { EditGarageDialogComponent } from '../edit-garage-dialog/edit-garage-dialog.component';

@Component({
  selector: 'app-registergarage',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css']
})
export class RegistergarageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  garages = [
    {
      name: 'Garage',
      address: 'Av. Mariana de Jésus 1',
      city: 'Quito',
      zip: '170101',
      phonenumber: '+593 4 123 4567',
      info: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
      image: '../../assets/img/quito-garage.jpg'
    }
  ];

  openCreateGarageDialog() {
    let dialogRef = this.dialog.open(CreateGarageDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        result.image = '../../assets/img/guayaquil-garage.jpg'
        this.garages.push(result);
      }
    });
  }

  openEditGarageDialog(garage: any){
    let dialogRef = this.dialog.open(EditGarageDialogComponent, {
      data: {
        garage: {
          name: garage.name,
          address: garage.address,
          city: garage.city,
          zip: garage.zip,
          phonenumber: garage.phonenumber,
          info: garage.info,
          image: garage.image
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        garage.name = result.name;
        garage.address = result.address;
        garage.city = result.city;
        garage.zip = result.zip;
        garage.phonenumber = result.phonenumber;
        garage.info = result.info;
        garage.image = result.image;
      }
    })
  }

  ngOnInit(): void {
  }

}
