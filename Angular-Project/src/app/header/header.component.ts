import { AuthService } from './../auth/auth.service';
import { Response } from '@angular/http';
import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	constructor(
		private dataStorageService: DataStorageService,
		private recipeService: RecipeService,
		private authService: AuthService
	) { }

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
