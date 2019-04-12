import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productName = 'A Book';
  isDisabled = true;
  products = [];
  private productsSubscription: Subscription;

  constructor(private productsService: ProductsService) {
    setTimeout(() => {
      // this.productName = 'A Tree';
      this.isDisabled = false;
    }, 3000);
  }

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.productsSubscription = this.productsService.productsUpdated.subscribe(() => {
      this.products = this.productsService.getProducts();
    });
  }

  onAddProduct(form) {
    // this.products.push(this.productName);
    if (form.valid) {
      // this.products.push(form.value.productName);
      this.productsService.addProduct(form.value.productName);
    }
  }

  onRemoveProduct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
