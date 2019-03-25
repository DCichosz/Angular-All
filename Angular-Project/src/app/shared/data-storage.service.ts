import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Http } from '@angular/http';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
	constructor(private http: Http, private recipeService: RecipeService) { }

	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		return this.http.put('https://ng-recipe-book-50c70.firebaseio.com/recipes.json', recipes);
	}
}
