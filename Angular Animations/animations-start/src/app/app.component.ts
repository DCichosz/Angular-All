import {Component} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [trigger('divState', [
    state('normal', style({
      'background-color': 'red',
      transform: 'translateX(0)'
    })),
    state('highLighted', style({
      'background-color': 'blue',
      transform: 'translateX(100px)'
    })),
    // nie trzeba kopiować, jesli chcemy zrobic animacje w 2 strony
    // wystarczy zamiast => dać <=>
    transition('normal <=> highLighted', animate(300)),
    // transition('highLighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highLighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highLighted', animate(300)),
      transition('highLighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ])
  ]
})
export class AppComponent {

  state = 'normal';
  wildState = 'normal';

  list = ['Milk', 'Sugar', 'Bread'];


  onAnimate() {
    this.state === 'normal' ? this.state = 'highLighted' : this.state = 'normal';
    this.wildState = 'normal' ? this.wildState = 'highLighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }


  onAdd(item) {
    this.list.push(item);
  }
}
