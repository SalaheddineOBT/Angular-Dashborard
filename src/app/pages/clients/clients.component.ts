import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientComponent implements OnInit, AfterViewInit {

    clients: any = [];
    client = [];

    displayedColumns = ['Photo', 'Name', 'Adresse', 'NationalId', 'NumPermis', 'Email', 'NumPhone', 'Actions'];
    dataSource: MatTableDataSource<Client>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatMenuTrigger, { static: true }) matMenu: MatMenuTrigger;

    constructor(private apiService: ApiService) { }

    async ngOnInit(): Promise<void> {
        await this.filClients();
        this.fillTable();
    }

    ngAfterViewInit(): void { }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    fillTable() {
        this.dataSource = null;
        this.clients.forEach((element: any) => {
            this.client.push({
                'ID': element.ID,
                'Name': element.Name,
                'NumPermis': element.NumPermis,
                'Photo': element.Photo,
                'NumPhone': element.NumPhone,
                'Email': element.Email,
                'Adresse': element.Adresse,
                'NationalId': element.NationalID
            });
        });
        this.dataSource = new MatTableDataSource(this.client);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    filClients(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.apiService.getClients().subscribe((res: any) => {
                if (res.success) {
                    this.clients = res.Clients;
                    resolve();
                } else {
                    reject();
                }
            });
        })
    }

}

export interface Client {
    ID?: any;
    Name: string;
    NationalId: any;
    NumPermis: any;
    Photo: any;
    NumPhone: any;
    Email: any;
    Adresse: any;
}
