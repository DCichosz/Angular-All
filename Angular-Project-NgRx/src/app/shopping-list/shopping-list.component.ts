import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[];

	constructor(private store: Store<fromShoppingList.AppState>) { }

	ngOnInit() {
		this.ingredients = this.store.select('shoppingList');
	}

	onEditItem(index: number): void {
		this.store.dispatch(new ShoppingListActions.StartEdit(index));
	}
}
