import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {

  msg:string = ""
  arrErrors:any = []
  companies:any;

  gameForm = this.fb.group({
    title:[ '', [Validators.required,]],
    stock:[ '', [Validators.required,]],
    company_id:[ '', [Validators.required,]],
    departure_date:[ '', [Validators.required,]],
    price:[ '', [Validators.required]],
    platform: [ '', [Validators.required]],
    img:[ ''],
  })

  constructor(private gameService: GameService, 
              private authService: AuthService,
              private companyService: CompanyService,
              private fb:FormBuilder) { 
    this.getCompanies()
    }

  createGame(){
    this.gameService.createGame(this.gameForm.value).subscribe( res => {

      this.arrErrors = null
      this.msg = "Creado correctamente"

    }, err => {
      this.arrErrors = err.error.errors
      const {msg} = err.error

      if (msg && msg.includes('Token No Valido')){
        this.authService.logout()
      }
      console.error(err)
    })

  }
 
  getCompanies(){
    this.companyService.getCompanies().subscribe(res => {
      this.companies = res

    }, err => {
      console.error(err)
    })

  }
  

}
