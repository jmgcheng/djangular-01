import { Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseService } from './purchase.service';
import { IPurchase } from './ipurchase';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent {
  sub!: Subscription;
  purchase: IPurchase | undefined;

  constructor(private purchaseService: PurchaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.purchaseService.getPurchaseWithProductDetails(id).subscribe({
      next: purchase => {
        this.purchase = purchase;
        // console.log('hermit1');
        // console.log(this.purchase);
        // console.log('hermit1');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
