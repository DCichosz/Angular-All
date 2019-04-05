import { Component } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [trigger('divState', [
    state('normal', style({
      'background-color': 'red',
      transform: 'translateX(0)'
    })),
    state('highLighted', style({
      'background-color': 'blue',
      transform: 'translateX(100px)'
    })),
    transition('normal => highLighted', animate(300)),
    transition('highLighted => normal', animate(800))
  ])]
})
export class AppComponent {

  state = 'normal';

  list = ["Milk", "Sugar", "Bread"];


  onAnimate() {
    this.state === 'normal' ? this.state = 'highLighted' : this.state = 'normal';
  }


  onAdd(item) {
    this.list.push(item);
  }
}
