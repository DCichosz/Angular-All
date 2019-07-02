import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LendService } from './lend.service';
import { Lend } from './lend.model';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css']
})
export class LendComponent implements OnInit {
  lended: Lend[];

  subscription: Subscription;
  constructor(private lenderService: LendService) {}

  ngOnInit() {
    this.lenderService.fetchLenders().then(data => this.lenderService.setLenders(data))
      .catch(() => this.lenderService.snackBar.open('Lenders :<', 'OK'));
    this.subscription = this.lenderService.lendersChanged.subscribe(
      (lended: Lend[]) => {
        this.lended = lended;
      }
    );
  }

  onReturn(index: number) {
    this.lenderService.returnBook(index);
  }
}
