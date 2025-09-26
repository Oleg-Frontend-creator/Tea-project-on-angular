import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  query: string = '';

  constructor(private router: Router,
              private productService: ProductService) {
  }

  onSearch() {
    this.productService.search(this.query);
    this.router.navigate(['/product-catalog']);
  }

  onReset() {
    this.query = '';
    this.productService.search('');
  }
}
