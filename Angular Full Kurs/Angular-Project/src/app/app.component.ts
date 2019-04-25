import { Component, OnInit } from '@angular/core';

// przykładowe użycie z backendem jako firebase, normalnie byśmy użyli httpservice do wysłania requesta i otrzymania jwt tokena
import * as firebase from 'firebase';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	ngOnInit() {
		firebase.initializeApp({
			apiKey: 'AIzaSyDl2-zQqBqFW8hZ3sFyfxmAJ3XecVPzW3I',
			authDomain: 'ng-recipe-book-50c70.firebaseapp.com'
		});
	}
}
