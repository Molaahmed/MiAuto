import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientDialogComponent } from '../create-client-dialog/create-client-dialog.component';
import { MatTableDataSource } from '@angular/material/table'
import { EditClientDialogComponent } from '../edit-client-dialog/edit-client-dialog.component';
import { ClientService } from 'src/app/services/client.service';

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  address: string;
  phone_number: string;
  email: string;
}

let CLIENTS: Client[];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  animations: [onMainContentChange]
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'car', 'edit'];
  dataSource = new MatTableDataSource(CLIENTS);
  public sideNavState: boolean = true;

  constructor(public dialog: MatDialog,
    private sidenavService: SidenavService,
    private clientService: ClientService) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.sideNavState = res;
    });
    this.getClients();
  }

  ngOnInit() {
  }

  clientsPredicateFilter(data: Client, filter: string) {
    let name = data.first_name + ' ' + data.last_name;
    return data.id.toString().toLowerCase().includes(filter) || name.toLowerCase().includes(filter);
  }

  getClients() {
    this.clientService.getAll().then(data => {
      CLIENTS = <Client[]> data.data.data;
      this.dataSource = new MatTableDataSource(CLIENTS);
    });
  }

  openCreateClientDialog() {
    let dialogRef = this.dialog.open(CreateClientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);
        let client = <Client>{
          id: CLIENTS[CLIENTS.length - 1].id + 1,
          first_name: result.firstName,
          last_name: result.lastName,
          date_of_birth: result.dateOfBirth,
          address: result.address,
          phone_number: result.phoneNumber,
          email: result.email,
          car: result.car
        };
        CLIENTS.push(client);
        this.dataSource = new MatTableDataSource(CLIENTS);
      }
    });
  }

  openEditClientDialog(client: Client) {
    let dialogRef = this.dialog.open(EditClientDialogComponent, {
      data: {
        client: {
          firstName: client.first_name,
          lastName: client.last_name,
          dateOfBirth: client.date_of_birth,
          address: client.address,
          phoneNumber: client.phone_number,
          email: client.email
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        client.first_name = result.firstName;
        client.last_name = result.lastName;
        client.date_of_birth = result.dateOfBirth;
        client.address = result.address;
        client.phone_number = result.phoneNumber;
        client.email = result.email;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = this.clientsPredicateFilter;
  }
}