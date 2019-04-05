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
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [style({
        opacity: 0,
        transform: 'translateX(-100px)'
      }),
        animate(300)]),
        transition('* => void', animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        })
        )),
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

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
}
