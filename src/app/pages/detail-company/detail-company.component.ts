import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.css']
})
export class DetailCompanyComponent implements OnInit {

  company:any;
  games:any;
  constructor(private companyService: CompanyService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getOneCompany(id)
  }

  getOneCompany(id: any){
    this.companyService.getOneCompany(id).subscribe( res => {
      this.company = res.company
      this.games = res.games

    }, err => {
      console.error(err)
    })
  }

}
