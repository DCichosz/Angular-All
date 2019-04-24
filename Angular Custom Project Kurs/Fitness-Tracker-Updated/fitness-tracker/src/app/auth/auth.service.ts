import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';

@Injectable({providedIn: 'root'})
export class AuthService {

	authChangeSource: Subject<boolean> = new Subject<boolean>();
	$authChanged = this.authChangeSource.asObservable();

	private isAuthenticated = false;

	constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {
	}


	registerUser(authData: AuthData) {
		this.afAuth.auth.createUserWithEmailAndPassword(
			authData.email,
			authData.password)
			.then(result => console.log(result))
			.catch(error => console.log(error));
	}

	login(authData: AuthData) {
		this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
			.then((result) => {
				console.log(result);
				this.authSuccessfully();
			})
			.catch(result => console.log(result));
	}

	logout() {
		this.trainingService.cancelSubscriptions();
		this.afAuth.auth.signOut();
		this.authChangeSource.next(false);
		this.router.navigate(['/login']);
		this.isAuthenticated = false;

	}

	getUser() {
		// spread operator , zeby zwrocic nowy obiekt a nie referencje
		return {...this.user};
	}

	isAuth() {
		return this.isAuthenticated;
	}

	private authSuccessfully() {
		this.isAuthenticated = true;
		this.authChangeSource.next(true);
		this.router.navigate(['/training']);
	}
}
