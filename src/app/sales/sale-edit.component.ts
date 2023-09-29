import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SaleService } from './sale.service';
import { ProductService } from '../products/product.service';

import { Observable, Subscription, fromEvent, merge, combineLatest } from 'rxjs';

import { ISale } from './isale';
import { IProductVariation } from '../products/product';
import { Sale } from './sale';

@Component({
  selector: 'app-sale-edit',
  templateUrl: './sale-edit.component.html',
  styleUrls: ['./sale-edit.component.css']
})
export class SaleEditComponent implements OnInit {
  pageTitle = 'Sale Edit';
  saleForm!: FormGroup;
  sale!: ISale | undefined;
  products: IProductVariation[] = [];
  private sub!: Subscription;
  private subSale!: Subscription;
  private subProducts!: Subscription;

  get sale_detail(): FormArray {
    return <FormArray>this.saleForm.get('sale_detail');
  }

  constructor(private saleService: SaleService,
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        combineLatest([
          this.saleService.getSaleWithProductDetails(id),
          this.productService.getProducts()
        ]).subscribe({
          next: ([sale, products]) => {
            this.sale = sale;
            this.products = products;

            // console.log('hermit5');
            // console.log(this.sale);
            // console.log(this.products);
            // console.log('hermit5');


            this.displaySale(this.sale);
          }
        });

      }
    );    

    //
    this.saleForm = this.fb.group({
      code: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)]],
      sale_detail: this.fb.array([], [Validators.required])
    });

  }

  displaySale(sale: ISale | undefined): void {
    if (this.saleForm) {
      this.saleForm.reset();
      this.saleForm.setControl('sale_detail', this.fb.array([]));
    }
    this.sale = sale;

    if (this.sale?.id === 0) {
      this.pageTitle = 'Add Sale';

      this.sale_detail.push(this.buildSaleDetail(0, 0));
    }
    else {
      this.pageTitle = `Edit Sale: ${this.sale?.code}`;

      this.saleForm.patchValue({
        code: this.sale?.code,
      });
      this.populateSaledetail();
    }
  }  

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addSaleDetail(): void {
    this.sale_detail.push(this.buildSaleDetail(0, 0));
  }  

  deleteSaleDetail(index: number): void {
    this.sale_detail.removeAt(index);
    this.sale_detail.markAsDirty();

    if (this.sale_detail.length == 0) {
      this.sale_detail.push(this.buildSaleDetail(0, 0));
    }

  }

  buildSaleDetail(productVariationId: number = -1, quantityReleased: number): FormGroup {
    // console.log('hermit7');
    // console.log(productVariationId);
    // console.log(quantityReleased);
    // console.log('hermit7');

    return this.fb.group({
      product_variation: [productVariationId, [Validators.required, Validators.min(1), Validators.pattern(/^[1-9][0-9]*$/)]],
      quantity_released: [quantityReleased, [Validators.required, Validators.min(1), Validators.pattern(/^[1-9][0-9]*$/)]],
    })
  }

  populateSaledetail(): void {
    for (const saleDetail of this.sale!.sale_detail) {
      // console.log('hermit6');
      // console.log(saleDetail.product_variation);
      // console.log(saleDetail.quantity_released);
      // console.log('hermit6');
      const productVariationId = saleDetail.product_variation; // Get the product variation ID from your data
      this.sale_detail.push(this.buildSaleDetail(productVariationId, saleDetail.quantity_released));
    }
  }  

  save(): void {
    // console.log(this.purchaseForm.value);
    // console.log('Saved: ' + JSON.stringify(this.purchaseForm.value));

    if (this.saleForm.valid) {
      if (this.saleForm.dirty) {
        const s = { ...this.sale, ...this.saleForm.value };
        console.log(s);


        if (s.id === 0) {
          console.log('saving new one');

          this.saleService.createSale(s)
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
          this.saleService.updateSale(s)
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
  
  deleteSale(): void {
    if (this.sale?.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }
    else if (this.sale?.id) {
      if (confirm(`Really delete: ${this.sale.code}?`)) {
        this.saleService.deleteSale(this.sale.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            // error: err => this.errorMessage = err
          });
      }
    }
  }  

  onSaveComplete(): void {
    this.saleForm.reset();
    this.router.navigate(['/sales']);
  }  

}
