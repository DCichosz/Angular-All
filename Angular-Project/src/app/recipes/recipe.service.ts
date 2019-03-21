import { Ingredient } from './../shared/ingredients.model';
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	private recipes: Recipe[] = [
		new Recipe(
			'Schabowy',
			'Przepyszny schaboszczak',
			'https://www.garneczki.pl/blog/wp-content/uploads/2018/09/Kotlet-schabowy-w-panierce-moczony-w-mleku-–-przepis-1440x960.jpg',
			[new Ingredient('Mięso', 1), new Ingredient('Frytki', 20)]
		),
		new Recipe(
			'Mielony',
			'Przepyszny mielony',
			'http://bi.gazeta.pl/im/e6/4a/11/z18132198Q,Przepis-na-kotlety-mielone--Najlepsze--bo-bez-udzi.jpg',
			[new Ingredient('Mięso', 2), new Ingredient('Ziemniaczki', 2)]
		)
	];

	recipeSelected = new EventEmitter<Recipe>();

	constructor(private shoppingListService: ShoppingListService) {}

	getRecipes(): Recipe[] {
		// return this.recipes; -- zwróci referencje do tych wyżej, a z kolei slice zwraca nową kopię bez referencji
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]): void {
		this.shoppingListService.addIngredients(ingredients);
	}
}
