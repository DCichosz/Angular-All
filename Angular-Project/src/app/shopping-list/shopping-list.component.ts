import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css'],
	providers: []
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[];
	constructor(private shoppingListService: ShoppingListService) {}

	ngOnInit() {
		this.ingredients = this.shoppingListService.getIngredients();
		this.shoppingListService.ingredientsChanged.subscribe(
			(ingredients: Ingredient[]) => (this.ingredients = ingredients)
		);
	}
}
