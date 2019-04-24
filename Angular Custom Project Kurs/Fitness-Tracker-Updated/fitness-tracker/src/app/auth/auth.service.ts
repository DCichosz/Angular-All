import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

@Injectable({providedIn: 'root'})
export class AuthService {

	authChangeSource: Subject<boolean> = new Subject<boolean>();
	$authChanged = this.authChangeSource.asObservable();

	private isAuthenticated = false;

	constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService,
				private snackbar: MatSnackBar, private uiService: UiService) {
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
		this.uiService.loadingStateChangedSource.next(true);
		this.afAuth.auth.createUserWithEmailAndPassword(
			authData.email,
			authData.password)
			.then(() => {
				this.uiService.loadingStateChangedSource.next(false);
			})
			.catch((error) => {
				this.uiService.loadingStateChangedSource.next(false);
				this.snackbar.open(error.message, null, {
					duration: 3000
				});
			});
	}

	login(authData: AuthData) {
		this.uiService.loadingStateChangedSource.next(true);
		this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
			.then(() => {
				this.uiService.loadingStateChangedSource.next(false);
			})
			.catch(error => {
				this.uiService.loadingStateChangedSource.next(false);
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
