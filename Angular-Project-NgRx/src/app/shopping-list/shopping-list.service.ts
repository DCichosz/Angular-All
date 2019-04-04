import { Ingredient } from './../shared/ingredients.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
	private ingredients: Ingredient[] = [
		new Ingredient('Jabłka', 5),
		new Ingredient('Pomidory', 10)
	];

	// zmiana event emitter na Subject
	ingredientsChanged = new Subject<Ingredient[]>();

	startedEditing = new Subject<number>();

	getIngredient(index: number): Ingredient {
		return this.ingredients[index];
	}

	updateIngredient(index: number, newIngredient: Ingredient) {
		this.ingredients[index] = newIngredient;
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	deleteIngredient(index: number) {
		this.ingredients.splice(index, 1);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
}
