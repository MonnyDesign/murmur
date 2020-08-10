import { Component, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OriginalBcMediaBannerComponent } from './original-bc-media-banner/original-bc-media-banner.component';
import { PricesCalculationService } from 'src/app/services/prices-calculation.service';

@Component({
  selector: 'app-original-bc',
  templateUrl: './original-bc.component.html',
  styleUrls: ['./original-bc.component.scss']
})
export class OriginalBcComponent implements OnInit, AfterViewChecked    {

  constructor(
    private productService: ProductsService,
    private pricesCalcService: PricesCalculationService
    ) {}

  products = [];
  productBasic = [];
  firstProduct = [];


  public sizeOptions = [
    { name: 'Standart', desc: '84mm x 55mm', value: 1 },
    { name: 'Square', desc: '65mm x 65mm', value: 2 }
  ]

  public cornerOptions = [
    { name: 'Square', value: 1 },
    { name: 'Rounded', value: 2 }
  ]

  selectedCardSizeTbl: string = "Standart";
  selectedCardCornersTbl: string = "Square";
  type = this.selectedCardSizeTbl + this.selectedCardCornersTbl;  
  selectedType: any;

  ngAfterViewChecked (): void{

  }

  ngOnInit(): void {
    const selectedType = this.selectedCardSizeTbl + this.selectedCardCornersTbl;

    if(selectedType === "StandartSquare"){
      this.onChangeTable(this.selectedCardSizeTbl, this.selectedCardCornersTbl);
    }   

  }

  onChangeTable(size: string, corner: string){
    const type = size + corner;
    
    this.productService.getJSON().subscribe(data => {
      this.products = data;
      const vat = 20;
      const currency: string = "£";
      

      this.productBasic = data.basicBc[0].productBasic;

      for(let key in this.productBasic){

        let cardType = this.productBasic[key];
        
        const cardTypeQnt = cardType.quantity;
        const cardTypePrice = cardType.price;
        const squareCardTypePrice = cardType.pricePerSquareCard;
        cardType.currency = currency;
        const cornerRoundedIndex = cardType.cornerRoundedIndex;
        const cornerRoundedSquareIndex = cardType.cornerRoundedSquareIndex;

        const price = this.pricesCalcService.calcPriceDataFun(cardTypeQnt, cardTypePrice);
        const priceSquare = this.pricesCalcService.calcPriceDataFun(cardTypeQnt, squareCardTypePrice);
        const priceRounded = this.pricesCalcService.priceRounded(cardTypeQnt, cardTypePrice, cornerRoundedIndex);
        const priceSquareRounded = this.pricesCalcService.priceRounded(cardTypeQnt, squareCardTypePrice, cornerRoundedSquareIndex);

        switch(type){
          case 'SquareSquare':
              cardType.pricePerCard = (priceSquare / cardTypeQnt).toFixed(2);
              cardType.priceVat = this.pricesCalcService.priceVatData(vat, cardTypeQnt, squareCardTypePrice);
              cardType.priceNoVat = this.pricesCalcService.calcPriceDataFun(cardTypeQnt, squareCardTypePrice);
            break;
          case 'StandartSquare':
              cardType.pricePerCard = (price / cardTypeQnt).toFixed(2);
              cardType.priceVat = this.pricesCalcService.priceRoundedVat(vat, cardTypeQnt, cardTypePrice, cornerRoundedIndex);
              cardType.priceNoVat = this.pricesCalcService.priceRounded(cardTypeQnt, cardTypePrice, cornerRoundedIndex);
            break;

          case 'StandartRounded':
              cardType.pricePerCard = (priceRounded / cardTypeQnt).toFixed(2);
              cardType.priceVat = this.pricesCalcService.priceRoundedVat(vat, cardTypeQnt, cardTypePrice, cornerRoundedIndex);
              cardType.priceNoVat = this.pricesCalcService.priceRounded(cardTypeQnt, cardTypePrice, cornerRoundedIndex);
            break;
          case 'SquareRounded':
              cardType.pricePerCard = (priceSquareRounded / cardTypeQnt).toFixed(2);
              cardType.priceVat = this.pricesCalcService.priceRoundedVat(vat, cardTypeQnt, squareCardTypePrice, cornerRoundedSquareIndex);
              cardType.priceNoVat = this.pricesCalcService.priceRounded(cardTypeQnt, squareCardTypePrice, cornerRoundedSquareIndex);
            break;
        }

      }

      
    }) 
  }

}
