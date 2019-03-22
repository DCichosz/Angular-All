import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private acitvatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    // +this.activatedRoute.snapshot.params['id]; --> + przed tym oznacza, że konwertujemy string id ( bo w routingu wszystko jest stringiem) na NUMBER
    this.server = this.serversService.getServer(
      +this.acitvatedRoute.snapshot.params['id']
    );

    // subskrycja wyczekujaca zmian!
    this.acitvatedRoute.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    });
  }

  onEdit(): void {
    // queryParamsHandling: preserve daje nam to, ze jesli nei dodajemy nowych parametrow to przekaze nam stare, jesli bysmy dodali nowe parametry
    // to nadpisalyby stare, w tym przypadku trzeba by uzyc 'merge'
    this.router.navigate(['edit'], {
      relativeTo: this.acitvatedRoute,
      queryParamsHandling: 'preserve'
    // preserveQueryParams: true zadziala tak samo jak to wyzej
    });
  }
}
