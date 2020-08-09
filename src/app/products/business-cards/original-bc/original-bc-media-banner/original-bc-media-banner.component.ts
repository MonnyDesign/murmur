import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-original-bc-media-banner',
  templateUrl: './original-bc-media-banner.component.html',
  styleUrls: ['./original-bc-media-banner.component.scss']
})
export class OriginalBcMediaBannerComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  products = [];
  productBasic: any = [];

  public sizeOptions = [
    { name: 'Standart', desc: '84mm x 55mm', value: 1 },
    { name: 'Square', desc: '65mm x 65mm', value: 2 }
  ]

  public cornerOptions = [
    { name: 'Square', value: 1 },
    { name: 'Rounded', value: 2 }
  ]

  selectedSize: string = ""; 
  selectedCorner: string = "Square"; 
  nestedImg: string = "../../../../../assets/imgs/card-images-nest.png";
  nestedImgUrl: string = "../../../../../assets/imgs/BC-";
  backgroundColor: string = '#AFCDD7';

  ngOnInit(): void {
  }

  onNestedImg(){
    if(this.selectedSize == ""){
      return this.nestedImg; 
    } else{
      this.nestedImg = this.nestedImgUrl + this.selectedSize + '-' + this.selectedCorner + '-bc.png';
      return this.nestedImg;
    }
  }

  onBackgroundChange(){
    if(this.selectedSize !== ""){
      return this.backgroundColor;
    }
  }

  onChangePrice(size: string, corner: string){
    const type = size + corner;
    console.log("CHILD");

    this.productService.getJSON().subscribe(data => {
      this.products = data;
      this.productBasic = data.basicBc[0].productBasic[0];


      const prodBasicQnt = this.productBasic.quantity;
      const prodBasicPrice = this.productBasic.price;
      const squareProdBasicPrice = this.productBasic.pricePerSquareCard;
      const cornerRoundedIndex = this.productBasic.cornerRoundedIndex;
      const cornerRoundedSquareIndex = this.productBasic.cornerRoundedSquareIndex;


      
      // switch(type){
      //   case 'SquareSquare':
      //     this.childMessage = '20';
      //   break;
      //   case 'StandartRounded':
      //     this.childMessage = '30';

      // }


    });
    
  }
  

}
