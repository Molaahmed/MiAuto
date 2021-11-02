import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientDialogComponent } from '../create-client-dialog/create-client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients = [
    { id: 1, name: 'Santiago Flores', phoneNumber: '+593 4 111 1111', car: '1A1AA11A1A1111111' },
    { id: 2, name: 'David Macias', phoneNumber: '+593 4 222 2222', car: '2B2BB22B2B2222222' },
    { id: 3, name: 'Victoria Castillo', phoneNumber: '+593 4 333 3333', car: '3C3CC33C3C3333333' },
    { id: 4, name: 'Luis Diaz', phoneNumber: '+593 4 444 4444', car: '4D4DD44D4D4444444' },
  ]

  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'car'];
  dataSource = this.clients;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateClientDialog(){
    let dialogRef = this.dialog.open(CreateClientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);
        let client = {
          id: this.clients[this.clients.length - 1].id + 1,
          name: result.firstName + ' ' + result.lastName,
          phoneNumber: result.phoneNumber,
          car: result.car
        }
        this.dataSource = this.clients.concat(client);
      }
    })
  }

}
