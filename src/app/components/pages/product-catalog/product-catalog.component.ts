import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Subscription, tap} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {
  public loading: boolean = false;
  public searchString: string;
  private subscriptionProducts: Subscription | null = null;
  public products: ProductType[] = [];

  constructor(private productService: ProductService,
              private router: Router) {
    this.searchString = productService.searchString;
  }

  ngOnInit() {
    this.loading = true;
    this.subscriptionProducts = this.productService.getProducts(this.searchString)
      .pipe(tap(() => this.loading = false))
      .subscribe(
        {
          next: data => this.products = data,
          error: err => {
            console.log(err);
            this.router.navigate(['/']);
          }
        });
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }

}
