import { Component, OnInit } from '@angular/core';

import { LendService } from './lend.service';
import { Lend } from './lend.model';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css']
})
export class LendComponent implements OnInit {
  lenders: Lend[];

  constructor(private lenderService: LendService) {}

  ngOnInit() {
    this.lenders = this.lenderService.getLenders();
  }
}
