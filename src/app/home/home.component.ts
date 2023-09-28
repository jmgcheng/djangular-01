import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { IProductVariation } from '../products/product';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sub!: Subscription;
  data: IProductVariation[] = [];
  products: IProductVariation[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: data => {
        // Use array.slice to limit the number of products to 3
        this.products = data.slice(0, 3);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
