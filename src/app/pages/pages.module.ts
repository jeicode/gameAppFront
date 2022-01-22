import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ListGamesComponent } from './list-games/list-games.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import { DetailGameComponent } from './detail-game/detail-game.component';
import { AdminGamesComponent } from './admin-games/admin-games.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { ListGamesSellerComponent } from './list-games-seller/list-games-seller.component';
import { DetailCompanyComponent } from './detail-company/detail-company.component';
import { ListPurchasesSellerComponent } from './list-purchases-seller/list-purchases-seller.component';




@NgModule({
  declarations: [
    PagesComponent,
    ListGamesComponent,
    DetailGameComponent,
    AdminGamesComponent,
    CreateCompanyComponent,
    CreateGameComponent,
    ListGamesSellerComponent,
    DetailCompanyComponent,
    ListPurchasesSellerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    MatPaginatorModule
    
  ]
})
export class PagesModule { }
