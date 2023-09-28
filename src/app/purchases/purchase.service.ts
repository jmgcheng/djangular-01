import { Injectable } from '@angular/core';
import { Observable, combineLatest, of, forkJoin } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, switchMap } from 'rxjs/operators';
import { IProductVariation } from "../products/product";
import { IPurchase } from './ipurchase';

import { AuthService } from '../user/auth.service';

import { ProductService } from '../products/product.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'http://localhost:8000/';
  private apiPurchasesUrl = 'api/purchases';

  constructor(private http: HttpClient, private authService: AuthService, private productService: ProductService) { }

  private samplePurchase(): Observable<IPurchase[]> {
    return of([{
      "id": 1,
      "code": "PO00001",
      "date": "2023-09-12",
      "purchase_detail": [
        {
          "product_variation": 1,
          "product_name": 'Test Product Name',
          "quantity_purchased": 100
        }
      ]
    }]);
  }

  getPurchases(): Observable<IPurchase[]> {

    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Token ${token}`
      });

      return this.http.get<IPurchase[]>(this.apiUrl + this.apiPurchasesUrl, { headers })
        .pipe(
          tap(data => console.log('All: ', JSON.stringify(data))),
        );
    }
    else {
      return this.samplePurchase();
    }
  }

  getPurchase(id: number): Observable<IPurchase | undefined> {
    return this.getPurchases()
      .pipe(
        map((purchases: IPurchase[]) => purchases.find(p => p.id === id))
      );
  }


  getPurchaseWithProductDetails(id: number): Observable<IPurchase | undefined> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    // Fetch the single purchase by ID
    const purchase$ = this.http.get<IPurchase>(`${this.apiUrl}${this.apiPurchasesUrl}/${id}`, { headers });

    // Fetch the products
    const products$ = this.productService.products$; // Replace with your products observable

    // Combine the purchase and products using forkJoin
    return forkJoin([purchase$, products$]).pipe(
      map(([purchase, products]) => {
        if (!purchase) {
          return undefined; // Handle the case where the purchase is not found
        }

        // Map purchase_detail to include product names
        const updatedPurchaseDetail = purchase.purchase_detail.map(detail => {
          const product = products.find(p => p.id === detail.product_variation);
          return {
            ...detail,
            product_name: product ? `${product.product.name} - ${product.name}` : 'Unknown'
          };
        });

        // Create a new purchase object with updated purchase_detail
        const updatedPurchase = {
          ...purchase,
          purchase_detail: updatedPurchaseDetail,
          searchKey: [purchase.code]
        } as IPurchase;

        return updatedPurchase;
      })
    );
  }



  /* purchases$ = this.getPurchases();
  purchasesWithProducts$ = combineLatest([
    this.purchases$,
    this.productService.products$
  ]).pipe(
    map(([purchases, products]) =>
      purchases.map(purchase => {
        // Find the corresponding product based on product_variation
        const product = products.find(product => product.id === purchase.purchase_detail[0].product_variation);
  
        return {
          ...purchase,
          productName: product ? product.product.name : 'Unknown', // Default to 'Unknown' if product is not found
          searchKey: [purchase.code]
        } as IPurchase;
      })
    )
  ); */




}
