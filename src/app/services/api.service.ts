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

    getCars(car: any) {
        return this.httpClient.post(this.uri + 'Cars/cars.php', car);
    };

    getMarques(marque: any) {
        return this.httpClient.post(this.uri + 'Marques/marques.php', marque);
    };

    getCategories(marque: any) {
        return this.httpClient.post(this.uri + 'Categories/categories.php', marque);
    };

    getCar(id: any, selected: any) {
        return this.httpClient.post(this.uri + `Cars/cars.php?id=${id}`, selected);
    };

    getReservations(selected: any) {
        return this.httpClient.post(this.uri + 'Reservations/reservations.php', selected);
    }

}
