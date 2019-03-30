import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
	token: string;

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
				console.log(response);
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
