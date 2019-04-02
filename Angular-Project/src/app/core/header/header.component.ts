import { Response } from '@angular/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	constructor(
		private dataStorageService: DataStorageService,
		private authService: AuthService
	) {}

	onSave() {
		this.dataStorageService
			.storeRecipes()
			.subscribe((response: Response) => console.log(response));
	}

	onFetch() {
		this.dataStorageService.fetchRecipes();
	}

	onLogout() {
		this.authService.signOutUser();
	}
}
