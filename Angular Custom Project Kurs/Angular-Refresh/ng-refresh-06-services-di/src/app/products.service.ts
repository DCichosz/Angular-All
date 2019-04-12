import { Subject } from 'rxjs';

export class ProductsService {
  private products = ['A Book'];
  productsUpdated = new Subject();

  addProduct(productName: string) {
    this.products.push(productName);
    this.productsUpdated.next();
  }

  getProducts() {
    return [...this.products];
  }

  deleteProduct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
    this.productsUpdated.next();
  }
}
