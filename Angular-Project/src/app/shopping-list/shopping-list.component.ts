import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[] = [
		new Ingredient('Jabłka', 5),
		new Ingredient('Pomidory', 10)
	];
	constructor() {}

	ngOnInit() {}

	onIngredientAdded(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
	}
}
