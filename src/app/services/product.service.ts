import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../types/product.type";
import {OrderFormType} from "../types/order-form.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public searchString: string = '';

  constructor(private http: HttpClient) {
  }

  public getProducts(searchString?: string): Observable<ProductType[]> {
    if (searchString) {
      return this.http.get<ProductType[]>('https://testologia.ru/tea' + (searchString ? ('?search=' + searchString) : ''));
    } else {
      return this.http.get<ProductType[]>('https://testologia.ru/tea');
    }
  }

  public getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

  public createOrder(data: OrderFormType) {
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.ru/order-tea`, data);
  }
}
