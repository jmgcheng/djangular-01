import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { IProductVariation } from "./product";

import { AuthService } from '../user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/';
  private apiProductsUrl = 'api/products';
  private apiPurchasesUrl = 'api/purchases';
  private apiSalesUrl = 'api/sales';

  private mockProductsUrl = 'api/mockProducts';
  private mockPurchasesUrl = 'api/mockPurchases';
  private mockSalesUrl = 'api/mockSales';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private sampleProduct(): Observable<IProductVariation[]> {
    return of([{
      "id": 1,
      "product": {
          "id": 1,
          "code": "PC00001",
          "name": "PF Hotdog",
          "excerpt": "",
          "description": "",
          "image_url": null
      },
      "unit": {
          "id": 1,
          "name": "packs"
      },
      "size": null,
      "color": null,
      "code": "PC0001PV0001",
      "name": "TJ Hotdog Classic",
      "excerpt": "Lorem ipsum dolor sit amet.",
      "description": "This is the description",
      "image_url": "https://placehold.co/300",
      "current_quantity": 100
    }]);
  }

  getProducts(): Observable<IProductVariation[]> {

    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Token ${token}`
      });

      return this.http.get<IProductVariation[]>(this.apiUrl + this.apiProductsUrl, {headers})
        .pipe(
          tap(data => console.log('All: ', JSON.stringify(data))),
        );
    }
    else {
      return this.sampleProduct();
    }
  }

  products$ = this.getProducts();

  getProduct(id: number): Observable<IProductVariation | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProductVariation[]) => products.find(p => p.id === id))
      );
  }

}
