import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ServerService {
  constructor(private httpService: Http) { }

  storeServers(servers: any[]) {
    // można przesyłać właśne headery
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // zwróci to tylko observable -> zeby wyslac polecenie musimy zasubskrybować
    return this.httpService.post('https://udemy-ng-http-92fec.firebaseio.com/data.json', servers, { headers: headers });


    // return this.httpService.put('https://udemy-ng-http-92fec.firebaseio.com/data.json', servers, {headers: headers});
  }

  getServers() {
    return this.httpService.get('https://udemy-ng-http-92fec.firebaseio.com/data')
      .pipe(map((response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = `FETCHED_${server.name}`;
        }
        return data;
      }))
      .pipe(catchError((error: Response) => {
        console.log(error);
        return throwError('Something went wrong');
    }));
  }
}
