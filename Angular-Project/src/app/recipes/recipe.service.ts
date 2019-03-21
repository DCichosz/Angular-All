import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
	private recipes: Recipe[] = [
		new Recipe(
			'Schabowy',
			'Przepyszny schaboszczak',
			'https://www.garneczki.pl/blog/wp-content/uploads/2018/09/Kotlet-schabowy-w-panierce-moczony-w-mleku-–-przepis-1440x960.jpg'
		),
		new Recipe(
			'Mielony',
			'Przepyszny mielony',
			'http://bi.gazeta.pl/im/e6/4a/11/z18132198Q,Przepis-na-kotlety-mielone--Najlepsze--bo-bez-udzi.jpg'
		)
	];

	recipeSelected = new EventEmitter<Recipe>();

	getRecipes(): Recipe[] {
		// return this.recipes; -- zwróci referencje do tych wyżej, a z kolei slice zwraca nową kopię bez referencji
		return this.recipes.slice();
	}
}
