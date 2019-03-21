import { Injectable } from '@angular/core';
import { CounterService } from './shared/counter.service';

@Injectable()
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {

    // inna wersja z subskrypcją
    this.counterService.activeEvent.subscribe((count: number) =>
      alert(`Active: ${count}`)
    );
    this.counterService.inactiveEvent.subscribe((count: number) =>
      alert(`Inactive: ${count}`)
    );
  }

  setToActive(id: number): void {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.countActive();
  }

  setToInactive(id: number): void {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counterService.countInactive();
  }
}
