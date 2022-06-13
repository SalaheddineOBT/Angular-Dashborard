import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements AfterViewInit, OnInit {

    reservations: any = [];
    reservation = [];

    displayedColumns = ['ID', 'PriceTotal', 'RentOn', 'ReturnOn', 'RentDurationDay', 'ReservationDate', 'Client', 'Car'];
    dataSource: MatTableDataSource<Reservation>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private apiService: ApiService) { }

    async ngOnInit(): Promise<void> {
        await this.filReservations();
        this.fillTable();
    }

    ngAfterViewInit() { }

    filReservations(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.apiService.getReservations().subscribe((res: any) => {
                if (res.success) {
                    this.reservations = res.Reservations;
                    resolve();
                } else {
                    reject();
                }
            });
        })
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();

        this.dataSource.filter = filterValue;
    }

    fillTable() {
        this.dataSource = null;
        this.reservations.forEach((element: any) => {
            this.reservation.push({
                'ID': element.ID,
                'PriceTotal': element.PriceTotal,
                'RentOn': element.RentOn,
                'ReturnOn': element.ReturnOn,
                'RentDurationDay': element.RentDurationDay,
                'ReservationDate': element.ReservationDate,
                'Client': element.Client.Name + ' / ' + element.Client.NationalID + ' / ' + element.Client.NumPermis,
                'Car': element.Car[0].Photo,
            });
        });

        this.dataSource = new MatTableDataSource(this.reservation);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}

export interface Reservation {
    ID: any
    PriceTotal: any;
    RentOn: any;
    ReturnOn: any;
    RentDurationDay: any;
    ReservationDate: any;
    Client: any;
    Car: any;
}
