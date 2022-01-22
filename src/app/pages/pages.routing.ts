import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGamesComponent } from './admin-games/admin-games.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { DetailCompanyComponent } from './detail-company/detail-company.component';
import { DetailGameComponent } from './detail-game/detail-game.component';
import { ListGamesSellerComponent } from './list-games-seller/list-games-seller.component';
import { ListGamesComponent } from './list-games/list-games.component';
import { ListPurchasesSellerComponent } from './list-purchases-seller/list-purchases-seller.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [],
        children: [
            { path: '', component: ListGamesComponent},
            { path: 'game/detail/:id', component: DetailGameComponent},
            { path: 'company/detail/:id', component: DetailCompanyComponent},
            
            { path: 'admin-games', 
              component: AdminGamesComponent, 
              children: [
                  { path: 'company/create', component: CreateCompanyComponent},
                  { path: 'game/create', component: CreateGameComponent},
                  { path: 'games/list', component: ListGamesSellerComponent},
                  { path: 'purchases/seller', component: ListPurchasesSellerComponent},
              ]},
            
        ]
    },
]
    
       

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
