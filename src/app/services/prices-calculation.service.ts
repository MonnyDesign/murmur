import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PricesCalculationService {

  constructor() { }

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

}
