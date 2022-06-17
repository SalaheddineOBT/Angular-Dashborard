import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {

    reservations: any = [];
    reservation = [];

    displayedColumns = ['ID', 'PriceTotal', 'RentOn', 'ReturnOn', 'Etat', 'ReservationDate', 'Client', 'Car', 'Actions'];
    dataSource: MatTableDataSource<Reservation>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatMenuTrigger, { static: true }) matMenu: MatMenuTrigger;

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

    DeleteRes() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You wont To Delete This Reservation ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            heightAuto: false
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
        }
        })
    }


    fillTable() {
        this.dataSource = null;
        this.reservations.forEach((element: any) => {
            this.reservation.push({
                'ID': element.ID,
                'PriceTotal': element.PriceTotal,
                'RentOn': element.RentOn,
                'ReturnOn': element.ReturnOn,
                'Etat': element.Etat,
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
    Etat: any;
    ReservationDate: any;
    Client: any;
    Car: any;
}
