import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoitureAlertModule } from 'app/components/voiture-alert/voiture-alert.module';
import { VoituresComponent } from './voitures.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FilterPipeModule } from 'app/pipes/filter/filter.module';


@NgModule({
    declarations: [
        VoituresComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        VoitureAlertModule,
        CarouselModule,
        FilterPipeModule,
        ReactiveFormsModule
    ],
    providers: [ApiService],
    exports: [VoituresComponent]
})
export class VoituresModule { }
