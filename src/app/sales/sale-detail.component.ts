import { Component, OnDestroy, OnInit } from '@angular/core';
import { SaleService } from './sale.service';
import { ISale } from './isale';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent {
  sub!: Subscription;
  sale: ISale | undefined;

  constructor(private saleService: SaleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.saleService.getSaleWithProductDetails(id).subscribe({
      next: sale => {
        this.sale = sale;
        console.log('hermit1');
        console.log(this.sale);
        console.log('hermit1');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }  

}
