import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };

  paramsSubscription: Subscription;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    // sposob na wyciagniecie parametru z routingu
    this.user = {
      id: this.activeRoute.snapshot.params['id'],
      name: this.activeRoute.snapshot.params['name']
    };

    // gdy jesteśmy na tym samym komponencie, dane sie nie zmienia dopoki nie zadeklarujemy subskrybcji parametrow poniżej ( uzycie przycisku Load Anna w user component )
   this.paramsSubscription =  this.activeRoute.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
