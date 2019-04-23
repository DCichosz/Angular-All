import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService {

	constructor(private router: Router) {
	}

	private user: User;
	authChangeSource: Subject<boolean> = new Subject<boolean>();
	$authChanged = this.authChangeSource.asObservable();


	registerUser(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString()
		};

		this.authSuccessfully();
	}

	login(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString()
		};

		this.authSuccessfully();
	}

	logout() {
		this.user = null;
		this.authChangeSource.next(false);
		this.router.navigate(['/login']);

	}

	getUser() {
		// spread operator , zeby zwrocic nowy obiekt a nie referencje
		return {...this.user};
	}

	isAuth() {
		return this.user != null;
	}

	private authSuccessfully() {
		this.authChangeSource.next(true);
		this.router.navigate(['/training']);
	}
}
