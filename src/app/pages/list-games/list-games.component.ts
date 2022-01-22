import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  listGames:any = []
  current_page: number = 1;
  limit:number = 5;
  total_pages:number = 0;
  total_items:number = 0
  userIsAuth:boolean;
  msg_auth:string = ''

  constructor(private gameService: GameService, private auth: AuthService ) { 

    this.userIsAuth = auth.usersIsAuth
    if(auth.usersIsAuth){
      this.msg_auth = "Cerrar sesion"
    } else {

      this.msg_auth = "Iniciar sesion"
    }

  }

  ngOnInit(): void {
    this.getGames()
  }


  getGames(){

    this.gameService.getGames(this.current_page, this.limit).subscribe( res => {

      const {games, current_page, total_pages, count} = res
      this.listGames = games
      this.current_page = current_page
      this.total_pages = total_pages
      this.total_items = count
    }, err => {

      console.error("err")
  
    })
  }

  onPageChange(event:any){
    const {pageSize, pageIndex} = event
    this.limit = pageSize
    this.current_page = pageIndex + 1
    this.getGames()
  }

  logout(){
    this.auth.logout()
  }



}
