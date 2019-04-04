import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[];

	constructor(private shoppingListService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

	ngOnInit() {
		this.ingredients = this.store.select('shoppingList');
	}

	onEditItem(index: number): void {
		this.shoppingListService.startedEditing.next(index);
	}
}
