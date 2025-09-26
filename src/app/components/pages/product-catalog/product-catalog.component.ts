import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Subscription} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {
  private subscriptionProducts: Subscription | null = null;
  public products: ProductType[] = [];

  constructor(public productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }

}
