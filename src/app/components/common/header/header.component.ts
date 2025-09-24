import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchString: string = '';

  constructor(private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  searchBtnClick() {
    this.productService.searchString = this.searchString;
    this.router.navigate(['/product-catalog']);
  }

  resetBtnClick() {
    if (this.router.url.includes('product-catalog')) {
      location.reload();
    } else {
      this.productService.searchString = '';
      this.searchString = '';
    }
  }
}
