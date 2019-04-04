import { Ingredient } from './../shared/ingredients.model';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable({ providedIn: 'root' })
export class RecipeService {

	recipesChanged = new Subject<Recipe[]>();

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

	constructor(private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

	getRecipes(): Recipe[] {
		// return this.recipes; -- zwróci referencje do tych wyżej, a z kolei slice zwraca nową kopię bez referencji
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]): void {
		this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
	}

	getRecipe(index: number): Recipe {
		return this.recipes[index];
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}
}
