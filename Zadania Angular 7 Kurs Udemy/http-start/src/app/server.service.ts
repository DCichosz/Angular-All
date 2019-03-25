import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({ providedIn: 'root' })
export class ServerService {
  constructor(private httpService: Http) { }

  storeServers(servers: any[]) {

    // można przesyłać właśne headery
    const headers = new Headers({'Content-Type': 'application/json'});

    // zwróci to tylko observable -> zeby wyslac polecenie musimy zasubskrybować
    return this.httpService.post('https://udemy-ng-http-92fec.firebaseio.com/data.json', servers, {headers: headers});
  }

  getServers() {
    return this.httpService.get('https://udemy-ng-http-92fec.firebaseio.com/data.json');
  }
}
