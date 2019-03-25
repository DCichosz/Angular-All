import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({ providedIn: 'root' })
export class ServerService {
  constructor(private httpService: Http) { }

  storeServers(servers: any[]) {
  return this.httpService.post('https://udemy-ng-http-92fec.firebaseio.com/data.json', servers);
  }
}
