import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, AfterViewChecked, AfterContentInit, AfterContentChecked, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OriginalBcMediaBannerComponent } from './original-bc-media-banner/original-bc-media-banner.component';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-original-bc',
  templateUrl: './original-bc.component.html',
  styleUrls: ['./original-bc.component.scss']
})
export class OriginalBcComponent implements OnInit, AfterViewChecked    {
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
  @ViewChild(OriginalBcMediaBannerComponent) child: any;

  message: string;
  childSelectedCorner: string;
  childSelectedSize: string;


  constructor(private productService: ProductsService) {
   
   }

  ngAfterViewChecked (): void{

  }

  ngOnInit(): void {
    const selectedType = this.selectedCardSizeTbl + this.selectedCardCornersTbl;

    if(selectedType === "StandartSquare"){
      this.onChangeTable(this.selectedCardSizeTbl, this.selectedCardCornersTbl);
    }   
    
    this.message = this.child.selectedCorner;
    this.childSelectedCorner = this.child.selectedCorner;
    this.childSelectedSize = this.child.selectedSize;
    const type = this.childSelectedSize + this.childSelectedCorner;

    this.productService.getJSON().subscribe(data => {
      this.firstProduct = data.basicBc[0].productBasic[0];
      
    });



    switch(type){
      case "StandartSquare":
        console.log('aaa');
        break;
      case "StandartRounded":
        console.log('bbb');
        break;
    }
  }
  

  calcPriceDataFun(quantity: number, keyPrice: number): any { 
    let priceProduct = Number(keyPrice); // 0.2198
    let totalPrice = priceProduct * quantity; // 0.2198 * 50
    return totalPrice.toFixed(2); // 10.99
  }

  priceVatData(vat: any, qnt: any, price: any): any {
    let priceVatEx = Number(this.calcPriceDataFun(qnt, price));
    let priceAndVat = (priceVatEx * vat) / 100;
    let total = priceAndVat + priceVatEx;
    return total.toFixed(2);
  }

  // cena * index ======================
  priceRounded(quantity: number, keyPrice: number, cornerRounded: number): any {
    var qnt = Number(quantity); // 50
    var priceProduct = Number(keyPrice); // 0.2332
    var index = Number(cornerRounded); // 0.0501
    var priceByIndex = qnt * index; // 50 * 0.05 = 2.5
    var totalPrice = priceByIndex + (qnt * priceProduct); // 2.5 + 0.2332 = 0.583
    return totalPrice.toFixed(2); // 
  }

  priceRoundedVat(vat: number, qnt: number, price: number, cornerRounded: any) {
    var priceVatEx = Number(this.priceRounded(qnt, price, cornerRounded));
    var priceAndVat = (priceVatEx * vat) / 100;
    var total = priceAndVat + priceVatEx;
    return total.toFixed(2);
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

        const price = this.calcPriceDataFun(cardTypeQnt, cardTypePrice);
        const priceSquare = this.calcPriceDataFun(cardTypeQnt, squareCardTypePrice);
        const priceRounded = this.priceRounded(cardTypeQnt, cardTypePrice, cornerRoundedIndex);
        const priceSquareRounded = this.priceRounded(cardTypeQnt, squareCardTypePrice, cornerRoundedSquareIndex);

        switch(type){
          case 'SquareSquare':
              cardType.pricePerCard = (priceSquare / cardTypeQnt).toFixed(2);
              cardType.priceVat = this.priceVatData(vat, cardTypeQnt, squareCardTypePrice);
              cardType.priceNoVat = this.calcPriceDataFun(cardTypeQnt, squareCardTypePrice);
            break;
          case 'StandartSquare':
              cardType.pricePerCard = (price / cardTypeQnt).toFixed(2);
              cardType.priceVat = this.priceRoundedVat(vat, cardTypeQnt, cardTypePrice, cornerRoundedIndex);
              cardType.priceNoVat = this.priceRounded(cardTypeQnt, cardTypePrice, cornerRoundedIndex);
            break;

          case 'StandartRounded':
              cardType.pricePerCard = (priceRounded / cardTypeQnt).toFixed(2);
              cardType.priceVat = this.priceRoundedVat(vat, cardTypeQnt, cardTypePrice, cornerRoundedIndex);
              cardType.priceNoVat = this.priceRounded(cardTypeQnt, cardTypePrice, cornerRoundedIndex);
            break;
          case 'SquareRounded':
              cardType.pricePerCard = (priceSquareRounded / cardTypeQnt).toFixed(2);
              cardType.priceVat = this.priceRoundedVat(vat, cardTypeQnt, squareCardTypePrice, cornerRoundedSquareIndex);
              cardType.priceNoVat = this.priceRounded(cardTypeQnt, squareCardTypePrice, cornerRoundedSquareIndex);
            break;
        }

      }

      
    }) 
  }

}
