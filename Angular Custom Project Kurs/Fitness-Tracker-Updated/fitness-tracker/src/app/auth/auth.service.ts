import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {AuthData} from './auth-data.model';
import {User} from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
	private user: User;
	authChangeSource: Subject<boolean> = new Subject<boolean>();
	$authChanged = this.authChangeSource.asObservable();


	registerUser(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString()
		};

		this.authChangeSource.next(true);
	}

	login(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString()
		};

		this.authChangeSource.next(true);
	}

	logout() {
		this.user = null;
		this.authChangeSource.next(false);
	}

	getUser() {
		// spread operator , zeby zwrocic nowy obiekt a nie referencje
		return {...this.user};
	}

	isAuth() {
		return this.user != null;
	}
}
