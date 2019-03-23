import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSub: Subscription;
  customObsSub: Subscription;


  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000);
    this.numbersObsSub = myNumbers.subscribe((number: number) => {
      console.log(number);
    });

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('this does not work');
        observer.complete();
        // po complete nic sie nie wykona, wiec nie dojdzie nawet do tego third package
      }, 5000);
      setTimeout(() => {
        observer.next('third package');
      }, 6000);
    });
    // przypisujemy subskrypcje do zmiennej, zeby potem mozna ja bylo wywalic po
    // destroy'u komponentu, zeby nie tworzyc memory leakow! zawsze to trzeba zrobic
    // bez odsubowania nadal sie bedzie wykonywac!!!!!
    this.customObsSub = myObservable.subscribe((data: string) => {
      console.log(data);
    },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      }
    );
  }

  ngOnDestroy() {
    // trzeba posprzatac zeby nie robic memory leakow!
    // jeśli robimy właśne jest mus zeby to zrobić
    // Observable angulara same to robią ale dobrą praktyką jest
    // CZYŚCIĆ
    this.numbersObsSub.unsubscribe();
    this.customObsSub.unsubscribe();
  }
}
