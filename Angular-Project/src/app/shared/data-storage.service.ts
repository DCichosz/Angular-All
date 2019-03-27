import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Http, Response } from '@angular/http';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
	constructor(
		private http: Http,
		private recipeService: RecipeService,
		private authService: AuthService
	) {}

	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		const token = this.authService.getToken();
		return this.http.put(
			'https://ng-recipe-book-50c70.firebaseio.com/recipes.json?auth=' +
				token,
			recipes
		);
	}

	fetchRecipes() {
		const token = this.authService.getToken();
		return this.http
			.get(
				'https://ng-recipe-book-50c70.firebaseio.com/recipes.json?auth=' +
					token
			)
			.pipe(
				map((response: Response) => {
					// mapuje json na model
					const recipes: Recipe[] = response.json();
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
