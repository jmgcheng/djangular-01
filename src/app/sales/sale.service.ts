import { Injectable } from '@angular/core';
import { Observable, combineLatest, of, forkJoin } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, switchMap } from 'rxjs/operators';
import { IProductVariation } from "../products/product";
import { ISale } from './isale';

import { AuthService } from '../user/auth.service';

import { ProductService } from '../products/product.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = 'http://127.0.0.1:8000/';
  private apiSalesUrl = 'api/sales';

  constructor(private http: HttpClient, private authService: AuthService, private productService: ProductService) { }

  private sampleSale(): Observable<ISale[]> {
    return of([{
      "id": 1,
      "code": "SI00001",
      "date": "2023-09-12",
      "sale_detail": [
        {
          "product_variation": 1,
          "product_name": 'Test Product Name',
          "quantity_released": 100
        }
      ]
    }]);
  }

  getSales(): Observable<ISale[]> {

    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Token ${token}`
      });

      return this.http.get<ISale[]>(this.apiUrl + this.apiSalesUrl, { headers })
        .pipe(
          tap(data => console.log('All: ', JSON.stringify(data))),
        );
    }
    else {
      return this.sampleSale();
    }
  }

  getSale(id: number): Observable<ISale | undefined> {
    return this.getSales()
      .pipe(
        map((sales: ISale[]) => sales.find(s => s.id === id))
      );
  }  

  getSaleWithProductDetails(id: number): Observable<ISale | undefined> {
    if (id === 0) {
      return of(this.initializeSale());
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    // Fetch the single sale by ID
    const sale$ = this.http.get<ISale>(`${this.apiUrl}${this.apiSalesUrl}/${id}`, { headers });

    // Fetch the products
    const products$ = this.productService.products$;

    // Combine the purchase and products using forkJoin
    return forkJoin([sale$, products$]).pipe(
      map(([sale, products]) => {
        if (!sale) {
          return undefined; // Handle the case where the purchase is not found
        }

        // Map sale_detail to include product names
        const updatedSaleDetail = sale.sale_detail.map(detail => {
          const product = products.find(p => p.id === detail.product_variation);
          return {
            ...detail,
            product_name: product ? `${product.product.name} - ${product.name}` : 'Unknown'
          };
        });

        // Create a new purchase object with updated sale_detail
        const updatedSale = {
          ...sale,
          sale_detail: updatedSaleDetail,
          searchKey: [sale.code]
        } as ISale;

        return updatedSale;
      })
    );
  }  

  private initializeSale(): ISale {
    // Return an initialized object
    return {
      id: 0,
      code: '',
      date: '',
      sale_detail: []
    };
  }

  createSale(sale: ISale): Observable<ISale> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
    sale.id = null;

    const url = `${this.apiUrl}${this.apiSalesUrl}/`;

    return this.http.post<ISale>(url, sale, { headers })
      .pipe(
        tap(data => console.log('createSale: ' + JSON.stringify(data))),
        // catchError(this.handleError)
      );
  }

  updateSale(sale: ISale): Observable<ISale> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });

    const url = `${this.apiUrl}${this.apiSalesUrl}/${sale.id}/`;

    return this.http.put<ISale>(url, sale, { headers })
      .pipe(
        tap(() => console.log('updateSale: ' + sale.id)),
        map(() => sale),
        // catchError(this.handleError)
      );
  }

  deleteSale(id: number): Observable<{}> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });

    const url = `${this.apiUrl}${this.apiSalesUrl}/${id}/`;

    return this.http.delete<ISale>(url, { headers })
      .pipe(
        tap(data => console.log('deleteSale: ' + id)),
        // catchError(this.handleError)
      );
  }


}
