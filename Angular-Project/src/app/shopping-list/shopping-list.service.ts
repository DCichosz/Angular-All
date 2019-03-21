import { Ingredient } from './../shared/ingredients.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
	private ingredients: Ingredient[] = [
		new Ingredient('Jabłka', 5),
		new Ingredient('Pomidory', 10)
	];

	ingredientsChanged = new EventEmitter<Ingredient[]>();

	getIngredients(): Ingredient[] {
		return this.ingredients.slice();
	}

	addIngredient(ingredient: Ingredient): void {
		this.ingredients.push(ingredient);
		this.ingredientsChanged.emit(this.ingredients.slice());
	}

	addIngredients(ingredients: Ingredient[]): void {
		// ingredients.forEach(ingredient => {
		// 	this.ingredients.push(ingredient);
		// });

		// ... pozwalaja na dodanie kazdego elementu w tablicy, tak zwany 'spread operator'
		this.ingredients.push(...ingredients);
		this.ingredientsChanged.emit(this.ingredients.slice());
	}
}
