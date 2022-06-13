import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VoitureAlertComponent } from 'app/components/voiture-alert/voiture-alert.component';
import { ApiService } from 'app/services/api.service';
import { TestService } from 'app/services/test.service';
import { TCar } from 'app/utils/types/car.type';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css']
})
export class VoituresComponent implements OnInit {

    car !: TCar | null;
    searchKey: any = '';

    page = 1;
    pageSize = 6;

    cars: any = [];
    categories: any = [];
    marques: any = [];

    public filterMarques: Array<TCar>;

    customOptions: OwlOptions = {
        loop: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 3
            },
            400: {
                items: 4
            },
            700: {
                items: 5
            },
            940: {
                items: 8
            }
        },
        nav: false
    };

    constructor(
        private apiService: ApiService,
        private modalService: NgbModal,
        public test: TestService,
        private router: Router
    ) {
        this.car = null;
        this.filterMarques = [];
    }

    ngOnInit() {
        this.fillCategories();
        this.fillCars();
        this.fillMarques();
    }

    fillCategories() {
        this.apiService.getCategories().subscribe((res: any) => {
            res.success ? this.categories = res.Categories : console.log(res.message);
        });
    }

    fillMarques() {
        this.apiService.getMarques().subscribe((res: any) => {
            res.success ? this.marques = res.Marques : console.log(res.message);
        });
    }

    fillCars() {
        this.apiService.getCars().subscribe((res: any) => {
            if (res.success) {
                this.cars = res.Cars
                this.filterMarques = res.Cars;
            } else {
                console.log(res.message);
            }
        });

    }

    public filter(marque: string) {
        this.filterMarques = this.cars.filter((a: any) => {
            if (a.Marque === marque || marque === '') {
                return a;
            }
        });
    }

    changing(e: any) {
        this.searchKey = (e.target as HTMLInputElement).value;
        this.apiService.search.next(this.searchKey);
    }

    public onCarUpdate(item: TCar): void {
        const modal = this.modalService.open(VoitureAlertComponent, { size: 'lg' })
        this.test.methode = 'Update';
        modal.componentInstance.car = item;
    }

    public onCarAdd(): void {
        const modal = this.modalService.open(VoitureAlertComponent, { size: 'lg' })
        this.test.methode = 'Add';
        modal.componentInstance.car = this.car;
    }

    public navigateToDerail(id: any) {
        this.router.navigate(['/details', id]);
    }

}
