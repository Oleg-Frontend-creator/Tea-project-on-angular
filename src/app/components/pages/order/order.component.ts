import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import ChangeEvent = JQuery.ChangeEvent;
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import ClickEvent = JQuery.ClickEvent;
import {OrderFormType} from "../../../types/order-form.type";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  public orderName: string = '';
  public subscriptionOrder: Subscription | null = null;
  public isFormSubmitted: boolean = false;
  public isFormInvalid: boolean = false;
  public isDataSending: boolean = false;

  orderForm = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^\+*[0-9]{11}$/)]],
    orderName: [`${this.orderName}`],
    orderComment: [''],
    country: ['', [Validators.required]],
    postIndex: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    address: ['', [Validators.required, Validators.pattern(/^[a-zа-я\d\s-/]+$/i)]]
  }, {validators: [Validators.required]});

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(item => this.orderName = item['product']);
  }

  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }

  onLettersInput(event: KeyboardEvent) {
    if (!/[a-zа-я]/i.test(event.key)) {
      event.preventDefault();
    }
  }

  onNumbersInput(event: KeyboardEvent) {
    if (/[0-9]/.test(event.key) ||
      ['Backspace', 'Alt', 'Shift', 'Tab', 'ArrowRight', 'ArrowLeft', '+'].includes(event.key)) {
      return;
    } else {
      event.preventDefault();
    }
  }

  onPhoneInputChange(event: Event) {
    let inputValue = (event.target as HTMLInputElement).value;

    if (!/^\+?[0-9]{11}$/.test((event.target as HTMLInputElement).value)) {
      if (inputValue.includes('+')) {
        inputValue = inputValue.indexOf('+') === 0 ? inputValue.substring(0, 12) : '';
      } else {
        inputValue = inputValue.substring(0, 11);
      }
      (event.target as HTMLInputElement).value = inputValue;
    }
  }

  orderBtnClick(event: Event) {
    if (this.orderForm.valid) {
      this.isDataSending = true;
      const data: OrderFormType = {
        name: this.orderForm.controls.name.value!,
        last_name: this.orderForm.controls.surname.value!,
        phone: this.orderForm.controls.phone.value!,
        country: this.orderForm.controls.country.value!,
        zip: this.orderForm.controls.postIndex.value!,
        product: this.orderForm.controls.orderName.value!,
        address: this.orderForm.controls.address.value!
      };
      if (this.orderForm.controls.orderComment.value) {
        data.comment = this.orderForm.controls.orderComment.value;
      }
      this.subscriptionOrder = this.productService.createOrder(data).subscribe(response => {
        if (response.success && !response.message) {
          this.isFormSubmitted = true;
        } else {
          this.isFormInvalid = true;
        }
        this.isDataSending = false;
      });
    } else {
      this.isFormInvalid = true;
    }
  }

  get name() {
    return this.orderForm.get('name');
  }

  get surname() {
    return this.orderForm.get('surname');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get postIndex() {
    return this.orderForm.get('postIndex');
  }

  get address() {
    return this.orderForm.get('address');
  }
}
