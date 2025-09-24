import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'watch-out-popup',
  templateUrl: './watch-out-popup.component.html',
  styleUrls: ['./watch-out-popup.component.scss']
})
export class WatchOutPopupComponent implements OnInit {

  constructor() {
  }

  @Input() isShowModal = false;

  open(): void {
    this.isShowModal = true;
  }

  close(): void {
    this.isShowModal = false;
  }

  ngOnInit(): void {
  }

}
