import {
	HttpClient,
	HttpHeaders,
	HttpParams,
	HttpRequest
} from '@angular/common/http';
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
		// return this.httpClient.put(
		// 	'https://ng-recipe-book-50c70.firebaseio.com/recipes.json',
		// 	recipes,
		// 	{
		// 		observe: 'body',
		// 		// ustawianie parametrów dynamicznie
		// 		params: new HttpParams().set('auth', token)

		// 		// observe: 'response'
		// 		//  można do zapytania dodać headery własne
		// 		// headers: new HttpHeaders().set(
		// 		// 	'Authorization',
		// 		// 	'Bearer tokenchybatumabyc'
		// 		// )
		// 	}
		// );

		// kreowanie requestu od podszewki
		// działa to tak samo jak wyżej
		// jeśli coś pobieramy, uploadujemy, reportProgress się przydaje
		// type: 1 przy zwrotce obrazuje nam upload
		// type: 3 przy zwrotce obrazuje nam download
		const req = new HttpRequest(
			'PUT',
			'https://ng-recipe-book-50c70.firebaseio.com/recipes.json',
			recipes,
			{
				reportProgress: true,
				params: new HttpParams().set('auth', token)
			}
		);
		return this.httpClient.request(req);
	}

	fetchRecipes() {
		const token = this.authService.getToken();
		// nowy klient http, pozwala zadeklarowac w generyku jaka wartosc oczekujemy
		// wie jaki typ dostaniemy w response
		return (
			this.httpClient
				// for JSON Data
				// .get<Recipe[]>(
				// 	'https://ng-recipe-book-50c70.firebaseio.com/recipes.json?auth=' +
				// 		token
				// )
				.get<Recipe[]>(
					'https://ng-recipe-book-50c70.firebaseio.com/recipes.json?auth=' +
						token,
					{
						// standardowo ustawione jest tak jak poniżej - dla JSONA, nie musimy tego ustawiać
						// lecz mamy prawo zmienić czego będziemy oczekiwać, np możemy ustawić
						// pełny response, event, plik, cokolwiek
						observe: 'body',
						responseType: 'json'
					}
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
				})
		);
	}
}
