import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoitureAlertComponent } from './voiture-alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [
        VoitureAlertComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatPseudoCheckboxModule,
        NgbModule
    ],
    exports: [VoitureAlertComponent]
})
export class VoitureAlertModule { }
