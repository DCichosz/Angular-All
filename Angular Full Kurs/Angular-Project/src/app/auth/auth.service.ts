import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
	token: string;

	constructor(private router: Router) { }

	signUpUser(email: string, password: string) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(error => console.log(error));
	}

	signInUser(email: string, password: string) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(response => {
				// sample redirect after successfull login
				this.router.navigate(['/']);
				firebase
					.auth()
					.currentUser.getIdToken()
					.then((token: string) => (this.token = token));
			})
			.catch(error => console.log(error));
	}

	signOutUser() {
		firebase.auth().signOut();
		this.token = null;
	}

	getToken() {
		firebase
			.auth()
			.currentUser.getIdToken()
			.then((token: string) => (this.token = token));
		return this.token;
	}

	isAuthenticated(): boolean {
		return this.token != null;
	}
}
