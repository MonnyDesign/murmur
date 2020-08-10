import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { PricesCalculationService } from 'src/app/services/prices-calculation.service';

@Component({
  selector: 'app-original-bc-media-banner',
  templateUrl: './original-bc-media-banner.component.html',
  styleUrls: ['./original-bc-media-banner.component.scss']
})
export class OriginalBcMediaBannerComponent implements OnInit {

  constructor(
    private productService: ProductsService, 
    private pricesCalcService: PricesCalculationService) { }

  products = [];
  productBasic: any = [];
  prodBasicQnt: any = "50";
  currency: string = "";
  priceNoVat: any = "___";
  priceVat: string = "Choose your size";

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
      const vat = 20;
      const currency: string = "£"; 
      

      const prodBasicPrice = this.productBasic.price;
      const squareProdBasicPrice = this.productBasic.pricePerSquareCard;
      const cornerRoundedIndex = this.productBasic.cornerRoundedIndex;
      const cornerRoundedSquareIndex = this.productBasic.cornerRoundedSquareIndex;
      this.prodBasicQnt = this.productBasic.quantity;

      this.priceNoVat = this.pricesCalcService.calcPriceDataFun(this.prodBasicQnt, prodBasicPrice);
      this.currency = "£";

      switch(type){
        case 'SquareSquare':
          this.priceVat = this.pricesCalcService.priceVatData(vat, this.prodBasicQnt, squareProdBasicPrice);
          this.priceNoVat = this.pricesCalcService.calcPriceDataFun(this.prodBasicQnt, squareProdBasicPrice);
          break;
        case 'StandartSquare':
          this.priceVat = this.pricesCalcService.priceVatData(vat, this.prodBasicQnt, prodBasicPrice);
          this.priceNoVat = this.pricesCalcService.calcPriceDataFun(this.prodBasicQnt, prodBasicPrice);
          break;

        case 'StandartRounded':
          this.priceVat = this.pricesCalcService.priceRoundedVat(vat, this.prodBasicQnt, prodBasicPrice, cornerRoundedIndex);
          this.priceNoVat = this.pricesCalcService.priceRounded(this.prodBasicQnt, prodBasicPrice, cornerRoundedIndex);

          break;
        case 'SquareRounded':
            this.priceVat = this.pricesCalcService.priceRoundedVat(vat, this.prodBasicQnt, squareProdBasicPrice, cornerRoundedSquareIndex);
            this.priceNoVat = this.pricesCalcService.priceRounded(this.prodBasicQnt, squareProdBasicPrice, cornerRoundedSquareIndex);

          break;
      }

      console.log("HERE: " + this.productBasic.quantity);
      
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
