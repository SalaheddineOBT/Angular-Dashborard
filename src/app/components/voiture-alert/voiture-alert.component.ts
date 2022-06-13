import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/services/api.service';
import { TestService } from 'app/services/test.service';
import { TCar } from 'app/utils/types/car.type';

@Component({
    selector: 'app-voiture-alert',
    templateUrl: './voiture-alert.component.html',
    styleUrls: ['./voiture-alert.component.scss']
})
export class VoitureAlertComponent implements OnInit {

    infoForm!: FormGroup;

    car!: TCar | null;

    methodeForm!: string;

    marques: any = [];
    categories: any = [];

    public imgPath = '';

    constructor(
        private fb: FormBuilder,
        public modal: NgbActiveModal,
        private apiService: ApiService,
        public test: TestService
    ) {
        this.car = null;
    }

    ngOnInit(): void {
        this.initForm();
        console.log(this.car);
        this.apiService.getCategories(this.apiService.all).subscribe((res: any) => {
            res.success ? this.categories = res.Categories : console.log(res.message);
        });

        this.apiService.getMarques(this.apiService.all).subscribe((res: any) => {
            res.success ? this.marques = res.Marques : console.log(res.message);
        });

        this.methodeForm = this.test.methode;

        const img = 'https://rumbustious-hilltop.000webhostapp.com/API/Photos/cars/' + this.Photo;
        this.Photo ? this.imgPath = img : this.imgPath = '../../../assets/img/imageImport.jpg';

    }

    get Photo() { return this.infoForm.get('photo')?.value; }

    private initForm(): void {

        this.infoForm = this.fb.group({
            name: [this.car?.Name, [Validators.required, Validators.minLength(3)]],
            placeNum: [this.car?.PlaceNumber, [Validators.required, Validators.minLength(2)]],
            doorNum: [this.car?.NumbreDoors, [Validators.required, Validators.minLength(2)]],
            color: [this.car?.Color, Validators.required],
            price: [this.car?.PricePerDay, [Validators.required, Validators.minLength(1)]],
            photo: [this.car?.Photo, Validators.required],
            marque: [this.car?.Marque, Validators.required],
            description: [this.car?.Description, Validators.required],
            category: [this.car?.Categorie, Validators.required],
            km: [this.car?.KM, Validators.required],
            bagsNumber: [this.car?.BagsNumber, Validators.required],
            fuel: [this.car?.Fuel, Validators.required],
            options: this.fb.group({
                blutooth: [this.car?.Bluetooth],
                aircond: [this.car?.AirConditioner],
                airbag: [this.car?.AirBag],
                gps: [this.car?.GPS]
            })
        });

    }

    isInvalid(key: string): boolean {
        return Boolean(this.infoForm.get(key)?.invalid && this.infoForm.get(key)?.touched);
    }

    onValidate(): void {
        if (this.infoForm.valid) {

            if (this.methodeForm === 'Add') {
                console.log('Insert');
            } else if (this.methodeForm === 'Update') {
                console.log('Update');
            }
            // this.modal.close();
        }
    }

    UploadImg(event: any) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.imgPath = (e.target as any).result;
        }
        // console.log((event.target as any).value);
        reader.readAsDataURL(event.target.files[0]);
        this.imgPath = event.target.files[0];
        console.log(event.target.files)
        this.infoForm.get('photo')?.setValue(event.target.files);
        // this.setState({img:this.inputfile.current.currentSrc});
    }
}
