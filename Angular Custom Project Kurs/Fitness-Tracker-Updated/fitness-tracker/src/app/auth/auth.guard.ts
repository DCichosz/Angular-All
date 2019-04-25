import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad, Route,
	Router,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

	constructor(private authService: AuthService, private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.isAuth()) {
			return true;
		} else {
			this.router.navigate(['/login']);
		}
	}

	canLoad(route: Route) {
		if (this.authService.isAuth()) {
			return true;
		} else {
			this.router.navigate(['/login']);
		}
	}
}
