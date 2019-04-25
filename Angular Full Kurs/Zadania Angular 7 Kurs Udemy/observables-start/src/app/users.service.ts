import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersService {
  // Subject to taki Event Emitter, tylko zamiast emit uzywa sie next()
  // subject mozna triggerowac wszedzie w kodzie i subowac
  userActivated = new Subject();
}
