import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css'],
	providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Ingredient[];
	private subscription: Subscription;

	constructor(private shoppingListService: ShoppingListService) { }

	ngOnInit() {
		this.ingredients = this.shoppingListService.getIngredients();
		this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
			(ingredients: Ingredient[]) => (this.ingredients = ingredients)
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
