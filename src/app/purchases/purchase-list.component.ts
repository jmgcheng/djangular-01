import { Component } from '@angular/core';
import { PurchaseService } from './purchase.service';
import { IPurchase } from './ipurchase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent {
  sub!: Subscription;
  purchases: IPurchase[] = [];

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.sub = this.purchaseService.getPurchases().subscribe({
      next: data => {
        this.purchases = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
