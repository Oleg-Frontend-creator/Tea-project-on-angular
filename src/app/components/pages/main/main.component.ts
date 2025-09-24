import {AfterViewInit, Component} from '@angular/core';
import {Subject, Subscription} from "rxjs";

declare const $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  private subscription: Subscription | null = null;
  private subject: Subject<number>;
  public isShowModal: boolean = false;

  constructor() {
    this.subject = new Subject<number>();
    setTimeout(() => {
      this.subject.next(0);
    }, 10000);
  }

  ngAfterViewInit() {
    $('.slider-block').slick({
      dots: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
    });
    this.subscription = this.subject.subscribe({
      next: () => this.isShowModal = true,
      error: (err: string) => console.log('Error: ' + err)
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
