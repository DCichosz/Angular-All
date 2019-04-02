import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AuthService } from './../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
	constructor(
		private httpClient: HttpClient,
		private recipeService: RecipeService,
		private authService: AuthService
	) {}

	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		const token = this.authService.getToken();
		return this.httpClient.put(
			'https://ng-recipe-book-50c70.firebaseio.com/recipes.json?auth=' +
				token,
			recipes
		);
	}

	fetchRecipes() {
		const token = this.authService.getToken();
		// nowy klient http, pozwala zadeklarowac w generyku jaka wartosc oczekujemy
		// wie jaki typ dostaniemy w response
		return this.httpClient
			.get<Recipe[]>(
				'https://ng-recipe-book-50c70.firebaseio.com/recipes.json?auth=' +
					token
			)
			.pipe(
				map(recipes => {
					// mapuje json na model
					for (const recipe of recipes) {
						if (!recipe['ingredients']) {
							console.log(recipe);
							recipe['ingredients'] = [];
						}
					}
					return recipes;
				})
			)
			.subscribe((recipes: Recipe[]) => {
				this.recipeService.setRecipes(recipes);
			});
	}
}
