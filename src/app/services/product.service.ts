import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter, finalize,
  Observable,
  of,
  shareReplay,
  switchMap
} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductType} from "../types/product.type";
import {OrderFormType} from "../types/order-form.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchString$ = this.searchSubject.asObservable();

  results$ = this.searchString$.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(s => {
        const search = s.trim();
        const options = search ? {params: new HttpParams().set('search', search)} : {};

        this.loadingSubject.next(true);

        return this.http.get<ProductType[]>('https://testologia.ru/tea', options).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        );
      }),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {
  }

  search(searchStr: string) {
    this.searchSubject.next(searchStr);
  }

  get currentSearchStr(): string {
    return this.searchSubject.getValue();
  }

  public getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

  public createOrder(data: OrderFormType) {
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.ru/order-tea`, data);
  }
}
