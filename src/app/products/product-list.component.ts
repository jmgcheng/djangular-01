import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { IProductVariation } from './product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  sub!: Subscription;
  products: IProductVariation[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    /* 
      why unsubscribe
        - Memory Management
        - Preventing Unexpected Behavior
        - Resource Cleanup
    */
  }

}
