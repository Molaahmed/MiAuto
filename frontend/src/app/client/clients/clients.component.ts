import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientDialogComponent } from '../create-client-dialog/create-client-dialog.component';
import { MatTableDataSource } from '@angular/material/table'
import { EditClientDialogComponent } from '../edit-client-dialog/edit-client-dialog.component';

export interface Client {
  id: number,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  address: string,
  phoneNumber: string;
  email: string,
  car: string;
}

const clients: Client[] = [
  { id: 1, firstName: 'Santiago', lastName: 'Flores', dateOfBirth: new Date('01/01/2000'), address: 'Juan León Mera 19-36, Av. Patria', phoneNumber: '4 123 4567', email: 'santiagoflores@gmail.com', car: '1A1AA11A1A1111111' },
  { id: 2, firstName: 'David', lastName: 'Macias', dateOfBirth: new Date('01/01/2000'), address: 'Juan León Mera 19-36, Av. Patria', phoneNumber: '4 123 4567', email: 'davidmacias@gmail.com', car: '2B2BB22B2B2222222' },
  { id: 3, firstName: 'Victoria', lastName: 'Castillo', dateOfBirth: new Date('01/01/2000'), address: 'Juan León Mera 19-36, Av. Patria', phoneNumber: '4 123 4567', email: 'victoriacastillo@gmail.com', car: '3C3CC33C3C3333333' },
  { id: 4, firstName: 'Luis', lastName: 'Diaz', dateOfBirth: new Date('01/01/2000'), address: 'Juan León Mera 19-36, Av. Patria', phoneNumber: '4 123 4567', email:'luisdiaz@gmail.com', car: '4D4DD44D4D4444444' }
]

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  animations: [onMainContentChange]
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'car', 'edit'];
  dataSource = new MatTableDataSource(clients);
  public sideNavState: boolean = true;
  
  constructor(public dialog: MatDialog, private _sidenavService: SidenavService) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res);
      this.sideNavState = res;
    });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      let name = data.firstName + ' ' + data.lastName;
      return data.id.toString().toLowerCase().includes(filter) || name.toLowerCase().includes(filter);
    };
  }

  openCreateClientDialog(){
    let dialogRef = this.dialog.open(CreateClientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);
        let client = <Client>{
          id: clients[clients.length - 1].id + 1,
          firstName: result.firstName,
          lastName: result.lastName,
          dateOfBirth: result.dateOfBirth,
          address: result.address,
          phoneNumber: result.phoneNumber,
          email: result.email,
          car: result.car
        };
        clients.push(client);
        this.dataSource = new MatTableDataSource(clients);
      }
    });
  }

  openEditClientDialog(client: Client){
    let dialogRef = this.dialog.open(EditClientDialogComponent, {
      data: {
        client: {
          id: client.id,
          firstName: client.firstName,
          lastName: client.lastName,
          dateOfBirth: client.dateOfBirth,
          address: client.address,
          phoneNumber: client.phoneNumber,
          email: client.email,
          car: client.car
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        client.id = result.id;
        client.firstName = result.firstName;
        client.lastName = result.lastName;
        client.dateOfBirth = result.dateOfBirth;
        client.address = result.address;
        client.phoneNumber = result.phoneNumber;
        client.email = result.email;
        client.car = result.car;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}