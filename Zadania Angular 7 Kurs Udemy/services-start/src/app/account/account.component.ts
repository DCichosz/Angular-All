import { AccountService } from './../account.service';
import { LoggingService } from './../shared/logging.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
  //  providers: [LoggingService]
})
// jeśli wpiszemy w providers AccountService, to nadpiszemy jego instancje ktora jest juz zainicjowana w AppComponencie, serwisy w Angularze dzialaja na zasadzie
// app module - dla calej apki ta sama instancja
// app component - dla wszystkich componentow ta sama instancja ( te ktore dziedzicza po app component)
export class AccountComponent {
  constructor(
    private loggingService: LoggingService,
    private accountService: AccountService
  ) {}

  @Input() account: { name: string; status: string };
  @Input() id: number;

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    //  this.loggingService.logStatusChange(status);
    this.accountService.statusUpdated.emit(status);
  }
}
