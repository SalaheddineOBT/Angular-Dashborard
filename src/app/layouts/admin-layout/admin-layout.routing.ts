import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { VoituresComponent } from '../../pages/voitures/voitures.component';
import { ClientComponent } from '../../pages/clients/clients.component';
import { ReservationsComponent } from '../../pages/reservations/reservations.component';
import { VoitureDetailsComponent } from 'app/pages/voiture-details/voiture-details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'voitures', component: VoituresComponent },
    { path: 'clients', component: ClientComponent },
    { path: 'reservations', component: ReservationsComponent },
    { path: 'details/:id', component: VoitureDetailsComponent },
];
