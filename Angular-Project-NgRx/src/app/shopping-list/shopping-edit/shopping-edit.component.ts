import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	subscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editetItem: Ingredient;

	// TEMPLATE FORM APPROACH
	@ViewChild('f') slForm: NgForm;

	constructor(private shoppingListService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

	ngOnInit() {
		this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
			this.editedItemIndex = index;
			this.editMode = true;
			this.editetItem = this.shoppingListService.getIngredient(index);
			this.slForm.setValue({
				name: this.editetItem.name,
				amount: this.editetItem.amount
			});
		});
	}

	onSubmit(form: NgForm) {
		const value = form.value;
		const newIngredient = new Ingredient(value.name, value.amount);
		if (this.editMode) {
			this.store.dispatch(new ShoppingListActions.UpdateIngredient({ index: this.editedItemIndex, ingredient: newIngredient }));
		} else {
			this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
		}

		this.onClear();
	}

	onClear(): void {
		this.editMode = false;
		this.slForm.reset();
	}

	onDelete(): void {
		this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
		this.onClear();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
