import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientDialogComponent } from '../create-client-dialog/create-client-dialog.component';
import { MatTableDataSource } from '@angular/material/table'
import { EditClientDialogComponent } from '../edit-client-dialog/edit-client-dialog.component';
import { ClientService } from 'src/app/services/client.service';
import { CarService } from 'src/app/services/car.service';
import { GarageService } from 'src/app/services/garage.service';
import { DatePipe } from '@angular/common';

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  address: string;
  phone_number: string;
  email: string;
  car: string;
}

export interface BackendClient {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
  email: string;
  garage_id: number;
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
    private datePipe: DatePipe,
    private sidenavService: SidenavService,
    private clientService: ClientService,
    private carService: CarService,
    private garageService: GarageService) {
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

      for (let client of CLIENTS) {
        this.carService.getAllByClientId(client.id).then(data => {
          let cars = data.data.data;
          if (cars.length != 0) {
            client.car = cars[0].vin_number;
            if (cars.length > 1) {
              client.car += ", ...";
            }
          }
        });
      }
      this.dataSource = new MatTableDataSource(CLIENTS);
    });
  }

  openCreateClientDialog() {
    let dialogRef = this.dialog.open(CreateClientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let client = <BackendClient> result;

        // Convert Date of Birth
        let convertedDate = this.datePipe.transform(result.date_of_birth, 'yyyy-MM-dd');
        client.date_of_birth = convertedDate!;

        // Set GarageId
        this.garageService.getGarageId().then(data => {
          client.garage_id = data.data;

          this.clientService.createClient(client).then(data => {
            console.log(data.data);
            this.getClients();
          });
        });
      }
    });
  }

  openEditClientDialog(client: Client) {
    let dialogRef = this.dialog.open(EditClientDialogComponent, { data: client });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let updatedClient = <BackendClient> result;

        // Convert Date of Birth
        let convertedDate = this.datePipe.transform(result.date_of_birth, 'yyyy-MM-dd');
        updatedClient.date_of_birth = convertedDate!;

        // Set GarageId
        this.garageService.getGarageId().then(data => {
          updatedClient.garage_id = data.data;

          this.clientService.updateClient(client.id, updatedClient).then(data => {
            console.log(data.data);
            this.getClients();
          });
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = this.clientsPredicateFilter;
  }
}