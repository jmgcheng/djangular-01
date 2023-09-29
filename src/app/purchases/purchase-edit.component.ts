import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseService } from './purchase.service';
import { ProductService } from '../products/product.service';

import { Observable, Subscription, fromEvent, merge, combineLatest } from 'rxjs';

import { IPurchase } from './ipurchase';
import { IProductVariation } from '../products/product';
import { Purchase } from './purchase';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.css']
})
export class PurchaseEditComponent implements OnInit {
  pageTitle = 'Purchase Edit';
  purchaseForm!: FormGroup;
  purchase!: IPurchase | undefined;
  products: IProductVariation[] = [];
  private sub!: Subscription;
  private subPurchase!: Subscription;
  private subProducts!: Subscription;

  get purchase_detail(): FormArray {
    return <FormArray>this.purchaseForm.get('purchase_detail');
  }

  constructor(private purchaseService: PurchaseService,
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // // get purchase detail
    // this.subPurchase = this.purchaseService.getPurchaseWithProductDetails(id).subscribe({
    //   next: purchase => {
    //     this.purchase = purchase;
    //   }
    // });

    // // get products
    // this.subProducts = this.productService.getProducts().subscribe({
    //   next: products => {
    //     this.products = products;
    //   }
    // });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        combineLatest([
          this.purchaseService.getPurchaseWithProductDetails(id),
          this.productService.getProducts()
        ]).subscribe({
          next: ([purchase, products]) => {
            this.purchase = purchase;
            this.products = products;
            this.displayPurchase(this.purchase);
          }
        });

      }
    );


    //
    this.purchaseForm = this.fb.group({
      code: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)]],
      purchase_detail: this.fb.array([], [Validators.required])
    });

  }

  displayPurchase(purchase: IPurchase | undefined): void {
    if (this.purchaseForm) {
      this.purchaseForm.reset();
      this.purchaseForm.setControl('purchase_detail', this.fb.array([]));
    }
    this.purchase = purchase;

    if (this.purchase?.id === 0) {
      this.pageTitle = 'Add Purchase';

      this.purchase_detail.push(this.buildPurchaseDetail(0, 0));
    }
    else {
      this.pageTitle = `Edit Purchase: ${this.purchase?.code}`;

      this.purchaseForm.patchValue({
        code: this.purchase?.code,
      });
      this.populatePurchase_detail();
    }



    /* 
    this.purchaseForm.setControl('purchase_detail', this.fb.array( this.purchase?.purchase_detail || [] ));
    this.productForm.setControl('tags', this.fb.array(this.product.tags || [])); 
    */
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addPurchaseDetail(): void {
    this.purchase_detail.push(this.buildPurchaseDetail(0, 0));
  }

  deletePurchaseDetail(index: number): void {
    this.purchase_detail.removeAt(index);
    this.purchase_detail.markAsDirty();

    if (this.purchase_detail.length == 0) {
      this.purchase_detail.push(this.buildPurchaseDetail(0, 0));
    }

  }

  buildPurchaseDetail(productVariationId: number = -1, quantityPurchased: number): FormGroup {
    return this.fb.group({
      product_variation: [productVariationId, [Validators.required, Validators.min(1), Validators.pattern(/^[1-9][0-9]*$/)]],
      quantity_purchased: [quantityPurchased, [Validators.required, Validators.min(1), Validators.pattern(/^[1-9][0-9]*$/)]],
    })
  }

  populatePurchase_detail(): void {
    for (const purchaseDetail of this.purchase!.purchase_detail) {
      const productVariationId = purchaseDetail.product_variation; // Get the product variation ID from your data
      this.purchase_detail.push(this.buildPurchaseDetail(productVariationId, purchaseDetail.quantity_purchased));
    }
  }

  save(): void {
    // console.log(this.purchaseForm.value);
    // console.log('Saved: ' + JSON.stringify(this.purchaseForm.value));

    if (this.purchaseForm.valid) {
      if (this.purchaseForm.dirty) {
        const p = { ...this.purchase, ...this.purchaseForm.value };
        console.log(p);


        if (p.id === 0) {
          console.log('saving new one');
          
          this.purchaseService.createPurchase(p)
            .subscribe({
              next: x => {
                console.log(x);
                return this.onSaveComplete();
              },
              // error: err => this.errorMessage = err
            });
        } 
        else {
          console.log('updating');
          this.purchaseService.updatePurchase(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              // error: err => this.errorMessage = err
            });
        }



      } 
      else {
        this.onSaveComplete();
      }
    } 
    else {
      // this.errorMessage = 'Please correct the validation errors.';
      console.log('error hermit 1');
    }

  }

  deleteProduct(): void {
    if (this.purchase?.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }
    else if (this.purchase?.id) {
      if (confirm(`Really delete: ${this.purchase.code}?`)) {
        this.purchaseService.deletePurchase(this.purchase.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            // error: err => this.errorMessage = err
          });
      }
    }
  }

  onSaveComplete(): void {
    this.purchaseForm.reset();
    this.router.navigate(['/purchases']);
  }


}
