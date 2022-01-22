import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-detail-game',
  templateUrl: './detail-game.component.html',
  styleUrls: ['./detail-game.component.css']
})
export class DetailGameComponent implements OnInit {

  game:any;
  msg:string = "";
  user:any;
  isAuthUser:boolean = false
  classText:string = ""
  number_copies_purchased:number = 0;
  purchaseForm = this.fb.group({
    email:[ ],
    password:[],
    remember:[]
  })


  
  constructor(private gameService: GameService, 
              private fb: FormBuilder, 
              private purchaseService: PurchaseService,
              private authService: AuthService,
              private activatedRouter: ActivatedRoute) 
            {
      this.isAuthUser = this.authService?.usersIsAuth
      this.user = this.authService?.user

               }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.getOneGame(id)
  }

  getOneGame(id:any){
    this.gameService.getOneGame(id).subscribe( game => {

      this.game = game

    }, err => {
      console.error(err)
    })
  }

  createPurchase(){
    this.msg = ""
    const form = {
      number_copies_purchased: this.number_copies_purchased,
      game_id: this.game.id,
      buyer_id: this.user.id,
      seller_id: this.game.User.id

    }
    this.purchaseService.createPurchase(form).subscribe((res) => {
      const {msg, status} = res
      if (status === false){
        this.msg = msg
        this.classText = "text-danger"
      } else {
        this.msg = "Compra realizada!"
        this.classText = "text-success"
      }

      this.getOneGame(this.game.id)

    }, err => {
      console.error(err)
    })

  }

}
