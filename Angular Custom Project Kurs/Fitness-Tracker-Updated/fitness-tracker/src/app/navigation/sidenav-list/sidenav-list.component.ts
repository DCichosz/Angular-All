import {Subscription} from 'rxjs';
import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
	selector: 'app-sidenav-list',
	templateUrl: './sidenav-list.component.html',
	styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
	@Output() closeSidenav = new EventEmitter<void>();

	authSubscription: Subscription;
	isAuth: boolean;

	constructor(private authService: AuthService) {
	}

	ngOnInit() {

		// @ts-ignore
		this.authSubscription = this.authService.$authChanged._subscribe((authStatus: boolean) => {
			this.isAuth = authStatus;
		});
	}

	onClose() {
		this.closeSidenav.emit();
	}

	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}
}
