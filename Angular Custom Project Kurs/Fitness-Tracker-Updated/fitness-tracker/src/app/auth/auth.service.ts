import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';

@Injectable({providedIn: 'root'})
export class AuthService {

	authChangeSource: Subject<boolean> = new Subject<boolean>();
	$authChanged = this.authChangeSource.asObservable();

	private isAuthenticated = false;

	constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService,
				private snackbar: MatSnackBar) {
	}

	initAuthListener() {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.isAuthenticated = true;
				this.authChangeSource.next(true);
				this.router.navigate(['/training']);
			} else {
				this.trainingService.cancelSubscriptions();
				this.authChangeSource.next(false);
				this.router.navigate(['/login']);
				this.isAuthenticated = false;
			}
		});
	}

	registerUser(authData: AuthData) {
		this.afAuth.auth.createUserWithEmailAndPassword(
			authData.email,
			authData.password)
			.then(result => console.log(result))
			.catch(error => this.snackbar.open(error.message, null, {
				duration: 3000
			}));
	}

	login(authData: AuthData) {
		this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
			.then((result) => {
				console.log(result);
			})
			.catch(error => {
				console.log(error);
				this.snackbar.open(error.message, null, {
					duration: 3000
				});
			});
	}

	logout() {
		this.afAuth.auth.signOut();
	}

	isAuth() {
		return this.isAuthenticated;
	}
}
