import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientComponent implements OnInit, AfterViewInit {

    clients: any = [];
    client = [];

    displayedColumns = ['ID', 'Name', 'NationalId'];
    dataSource: MatTableDataSource<Client>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.filClients();
        this.fillTable();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;

        this.fillTable();
    }

    fillTable() {
        this.dataSource = null;
        this.clients.forEach((element: any) => {
            this.client.push({
                'ID': element.ID,
                'Name': element.Name,
                'NationalId': element.NationalId
            });
        });
        this.dataSource = new MatTableDataSource(this.client);
    }

    filClients() {
        this.apiService.getClients().subscribe((res: any) => {
            res.success ? this.clients = res.Clients : console.log(res.message);
        });
    }

}


export interface Client {
    ID: any;
    Name: string;
    NationalId: any;
}
