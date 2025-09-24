import {Component, OnInit} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private subscriptionProduct: Subscription | null = null;
  public product: ProductType;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    };
  }

  ngOnInit() {
    this.subscriptionProduct = this.activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.productService.getProduct(+params['id']).subscribe({
          next: data => this.product = data,
          error: err => {
            console.log(err);
            this.router.navigate(['/']);
          }
        });
    });
  }

  ngOnDestroy() {
    this.subscriptionProduct?.unsubscribe();
  }
}
