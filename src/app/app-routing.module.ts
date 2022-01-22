import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard'}
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    // routes modules
    PagesRoutingModule,
    AuthRoutingModule,

  ],
  exports: [RouterModule], 
})
export class AppRoutingModule { }
