import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { Car } from '../utils/models/car.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

    private uri = 'https://rumbustious-hilltop.000webhostapp.com/API/Operations/';

    public all = JSON.stringify({
        selectedBy : 'All'
    });

    public byId = JSON.stringify({
        selectedBy : 'ById'
    });

    public search = new BehaviorSubject<string>('');

    constructor(private httpClient: HttpClient) { };

    getCars() {
        return this.httpClient.post(this.uri + 'Cars/cars.php', this.all);
    };

    getMarques() {
        return this.httpClient.post(this.uri + 'Marques/marques.php', this.all);
    };

    getCategories() {
        return this.httpClient.post(this.uri + 'Categories/categories.php', this.all);
    };

    getCar(id: any) {
        return this.httpClient.post(this.uri + `Cars/cars.php?id=${id}`, this.byId);
    };

    getReservations() {
        return this.httpClient.post(this.uri + 'Reservations/reservations.php', this.all);
    }

    getClients() {
        return this.httpClient.post(this.uri + 'Clients/clients.php', this.all);
    }

}
