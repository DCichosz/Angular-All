import { EventEmitter, Injectable } from '@angular/core';



// ten zapis po nizej jest od angulara 6  - pozwala on na lazy loading czyli performance dziala to samo jak providers[] !!!!! TO JEST TYLKO DLA APP-WIDE SERVICE!!!!
@Injectable({providedIn: 'root'})
export class CounterService {
  inactiveUsersCount = 0;
  activeUsersCount = 0;

  inactiveEvent = new EventEmitter<number>();
  activeEvent = new EventEmitter<number>();

  countActive(): void {
    this.activeUsersCount++;
    console.log(`Active users operations count: ${this.activeUsersCount}`);

    //// inna wersja z subskrypcja w glownym serwisie
    this.activeEvent.emit(this.activeUsersCount);
  }

  countInactive(): void {
    this.inactiveUsersCount++;
    console.log(`Inactive users operations count: ${this.inactiveUsersCount}`);

    // inna wersja z subskrypcja w glownym serwisie
    this.inactiveEvent.emit(this.inactiveUsersCount);
  }
}
