import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	subscription: Subscription;
	editMode = false;
	editetItem: Ingredient;

	// TEMPLATE FORM APPROACH
	@ViewChild('f') slForm: NgForm;

	constructor(private store: Store<fromShoppingList.AppState>) { }

	ngOnInit() {
		this.subscription = this.store.select('shoppingList').subscribe(
			data => {
				if (data.editedIngredientIndex > -1) {
					this.editetItem = data.editedIngredient;
					this.editMode = true;
					this.slForm.setValue({
						name: this.editetItem.name,
						amount: this.editetItem.amount
					});
				} else {
					this.editMode = false;
				}
			}
		);
	}

	onSubmit(form: NgForm) {
		const value = form.value;
		const newIngredient = new Ingredient(value.name, value.amount);
		if (this.editMode) {
			this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient: newIngredient }));
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
		this.store.dispatch(new ShoppingListActions.DeleteIngredient();
		this.onClear();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
