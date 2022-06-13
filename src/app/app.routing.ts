import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FilterPipeModule } from './pipes/filter/filter.module';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
        }]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FilterPipeModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
