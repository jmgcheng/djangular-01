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
  private apiUrl = 'http://127.0.0.1:8000/';
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
    if (id === 0) {
      return of(this.initializePurchase());
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    // Fetch the single purchase by ID
    const purchase$ = this.http.get<IPurchase>(`${this.apiUrl}${this.apiPurchasesUrl}/${id}`, { headers });

    // Fetch the products
    const products$ = this.productService.products$;

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


  private initializePurchase(): IPurchase {
    // Return an initialized object
    return {
      id: 0,
      code: '',
      date: '',
      purchase_detail: []
    };
  }


  createPurchase(purchase: IPurchase): Observable<IPurchase> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
    purchase.id = null;

    const url = `${this.apiUrl}${this.apiPurchasesUrl}/`;

    return this.http.post<IPurchase>(url, purchase, { headers })
      .pipe(
        tap(data => console.log('createPurchase: ' + JSON.stringify(data))),
        // catchError(this.handleError)
      );
  }

  updatePurchase(purchase: IPurchase): Observable<IPurchase> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });

    const url = `${this.apiUrl}${this.apiPurchasesUrl}/${purchase.id}/`;

    return this.http.put<IPurchase>(url, purchase, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + purchase.id)),
        // Return the product on an update
        map(() => purchase),
        // catchError(this.handleError)
      );
  }

  deletePurchase(id: number): Observable<{}> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });

    const url = `${this.apiUrl}${this.apiPurchasesUrl}/${id}/`;

    return this.http.delete<IPurchase>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        // catchError(this.handleError)
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
