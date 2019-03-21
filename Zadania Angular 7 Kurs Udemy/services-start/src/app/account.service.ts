import { LoggingService } from './shared/logging.service';
import { Injectable, EventEmitter } from '@angular/core';

// jeśli wstrzykujemy jakiś serwis do serwisu to do serwisu który będzie używał wstrzykniętego serwisu trzeba dodać Injectable()
@Injectable()
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string): void {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);
  }
  updateStatus(id: number, status: string): void {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
