import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'app-voiture-details',
    templateUrl: './voiture-details.component.html',
    styleUrls: ['./voiture-details.component.scss']
})
export class VoitureDetailsComponent implements OnInit {

    car: any = [];

    constructor(
        private routAct: ActivatedRoute,
        private router: Router,
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.fillForm();
        // setTimeout(() => {
        //     this.fillForm();
        // }, 1000);
    }

    fillForm = async () => {
        const id = this.routAct.snapshot.paramMap.get('id');
        await this.apiService.getCar(id).subscribe((res: any) => {
            if (res.success) {
                this.car = res.Car;

            } else {
                console.log(res.message);
            }
        });
    }

    back = () => this.router.navigate(['/voitures']);

}
