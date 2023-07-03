import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})

export class ColorComponent implements OnInit {


  isLoaded = false;
  colors : Color[] = [];
  currentColorId:number;

constructor(
  private colorService : ColorService,
  private toastrService : ToastrService
  ) {

}

ngOnInit(): void {
  this.getColors();
}

getColors()
{
  this.colorService.getColors().subscribe(res => {
    this.colors = res.data;
    this.isLoaded = true;
  })
}

isCurrentColor(colorId:number)
{
  return this.currentColorId==colorId;
}

setCurrentColor(colorId:number)
{
  this.currentColorId = colorId;
}

removeColor(color:Color)
{
  this.colorService.removeColor(color).subscribe(res => {
    this.colors.splice( this.colors.indexOf(color)  ,1);

  }
  ,
  error => {
    let err  : ErrorResponseModel = error;
    this.toastrService.error(err.error.message,err.error.message);
  }
  )
}

}
