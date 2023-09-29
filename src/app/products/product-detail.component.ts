import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { IProductVariation } from './product';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  sub!: Subscription;
  product: IProductVariation | undefined;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
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