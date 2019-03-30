import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

Injectable({ providedIn: 'root' });
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private authService: AuthService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.authService.isAuthenticated();
	}
	canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
		return this.authService.isAuthenticated();
	}
}
