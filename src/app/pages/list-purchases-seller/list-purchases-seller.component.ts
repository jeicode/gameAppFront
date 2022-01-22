import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-list-purchases-seller',
  templateUrl: './list-purchases-seller.component.html',
  styleUrls: ['./list-purchases-seller.component.css']
})
export class ListPurchasesSellerComponent implements OnInit {

  purchasesSeller:any;
  current_page: number = 1;
  limit:number = 5;
  total_pages:number = 0;
  total_items:number = 0;

  constructor(private purchaseService: PurchaseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.listPurchasesSeller()
  }

  listPurchasesSeller(){
    this.purchaseService.listPurchasesSeller(this.current_page, this.limit).subscribe( res => {

      const {purchases, current_page, total_pages, count} = res
      this.purchasesSeller = purchases
      this.current_page = current_page
      this.total_pages = total_pages
      this.total_items = count

    }, err => {
      console.error(err)

      if (err.error.msg && err.error.msg .includes('Token No Valido')){
        this.authService.logout() 
      }
    })
  }

  onPageChange(event:any){
    const {pageSize, pageIndex} = event
    this.limit = pageSize
    this.current_page = pageIndex + 1
    this.listPurchasesSeller()
  }
 

}
