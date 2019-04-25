import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from './servers.service';
import { Injectable } from '@angular/core';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  // mapuję id ze scieżki na aktualny obiekt i zwraca go w ActivatedRoute.data
  // przed pojsciem do sciezki docelowej Angular uzyje tego resolvera ( zadeklarowalismy jego uzycie w AppRoutingModule przy konkretnym adresie)
  // i zmapuje ID na serwer
  resolve(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+activatedRoute.params['id']);
  }
}
