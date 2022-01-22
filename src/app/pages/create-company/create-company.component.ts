import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  companyForm = this.fb.group({
    name:[ '', [Validators.required,]],
    description:[ '', [Validators.required,]],
    start_year_activities:[ '', [Validators.required,]],
    NIT:[ '', [Validators.required,]],
  })
  arrErrors:any = []
  msg:string = ""

  constructor(private companyService: CompanyService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createCompany(){
    this.companyService.createCompany(this.companyForm.value).subscribe( res => {

      this.msg = "Creado correctamente"

    }, err => {
      this.arrErrors = err.error.errors
      console.error(err.error.errors)
    })
  }

}
