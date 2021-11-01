import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientDialogComponent } from '../create-client-dialog/create-client-dialog.component';
import { MatTableDataSource } from '@angular/material/table'

export interface Client {
  id: number,
  name: string,
  phoneNumber: string;
  car: string;
}

const clients: Client[] = [
  { id: 1, name: 'Santiago Flores', phoneNumber: '+593 4 111 1111', car: '1A1AA11A1A1111111' },
  { id: 2, name: 'David Macias', phoneNumber: '+593 4 222 2222', car: '2B2BB22B2B2222222' },
  { id: 3, name: 'Victoria Castillo', phoneNumber: '+593 4 333 3333', car: '3C3CC33C3C3333333' },
  { id: 4, name: 'Luis Diaz', phoneNumber: '+593 4 444 4444', car: '4D4DD44D4D4444444' }
]

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'car'];
  dataSource = new MatTableDataSource(clients);
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.id.toString().toLowerCase().includes(filter);
    }
  }

  openCreateClientDialog(){
    let dialogRef = this.dialog.open(CreateClientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);
        let client = <Client>{
          id: clients[clients.length - 1].id + 1,
          name: result.firstName + ' ' + result.lastName,
          phoneNumber: result.phoneNumber,
          car: result.car
        }
        clients.push(client);
        this.dataSource = new MatTableDataSource(clients);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
