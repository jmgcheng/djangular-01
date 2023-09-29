import { Component } from '@angular/core';
import { SaleService } from './sale.service';
import { ISale } from './isale';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent {
  sub!: Subscription;
  sales: ISale[] = [];

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.sub = this.saleService.getSales().subscribe({
      next: data => {
        this.sales = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
