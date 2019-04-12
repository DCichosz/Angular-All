import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  productName = 'A Book';
  isDisabled = true;

  constructor() {
    setTimeout(() => {
      // this.productName = 'A Tree';
      this.isDisabled = false;
    }, 3000);
  }
}
