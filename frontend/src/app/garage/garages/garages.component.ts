import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CreateGarageDialogComponent } from '../create-garage-dialog/create-garage-dialog.component';

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
      console.log('Dialog result: ' + result);
      result.image = '../../assets/img/guayaquil-garage.jpg'
      this.garages.push(result);
    });
  }

  ngOnInit(): void {
  }

}
