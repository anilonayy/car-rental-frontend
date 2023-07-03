import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{

  isLoaded = false;
  brands : Brand[] = [];
  currentBrandId : number;

  constructor(
    private brandService:BrandService,
    private toastrService :ToastrService
    ) {

  }

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(response => {
      this.brands =response.data;
      this.isLoaded= true;
    })
  }




  isCurrentBrand(BrandId:number)
{
  return this.currentBrandId==BrandId;
}

setCurrentBrand(BrandId:number)
{
  this.currentBrandId = BrandId;
}


removeBrand(brand:Brand)
{
  this.brandService.removeBrand(brand).subscribe(
    res => {
     this.brands.splice( this.brands.indexOf(brand)  ,1);
    },
    error => {
      let err : ErrorResponseModel = error;
      this.toastrService.error(err.error.message,err.error.title )
    }
  )
}
}
