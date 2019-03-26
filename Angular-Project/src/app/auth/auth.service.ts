import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
	signUpUser(email: string, password: string) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(error => console.log(error));
	}
}
