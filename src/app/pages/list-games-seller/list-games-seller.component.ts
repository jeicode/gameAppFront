import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-list-games-seller',
  templateUrl: './list-games-seller.component.html',
  styleUrls: ['./list-games-seller.component.css']
})
export class ListGamesSellerComponent implements OnInit {

  listGames:any = []
  current_page: number = 1;
  limit:number = 5;
  total_pages:number = 0;
  total_items:number = 0
  msg_auth:string = ''
  user:any;
  search:string = ''

  constructor(private gameService: GameService,
              private authService: AuthService ) { 
      this.user = this.authService.user
  }

  ngOnInit(): void {
    this.getGames()
  }


  getGames(){
    if (this.search) this.current_page = 1
    this.gameService.getGamesSeller( this.current_page,  
                                     this.limit,
                                     this.user.id,
                                     this.search).subscribe( res => {

      const {games, current_page, total_pages, count} = res

      this.listGames = games
      this.current_page = current_page
      this.total_pages = total_pages
      this.total_items = count
    }, err => {
      console.error(err)
      const {msg} = err.error
      if (msg && msg.includes('Token No Valido')){
        this.authService.logout()
      }
    })
  }

  onPageChange(event:any){
    const {pageSize, pageIndex} = event
    this.limit = pageSize
    this.current_page = pageIndex + 1
    this.getGames()
  }

  searchValue(){
    this.getGames()
  }

}
