import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

	@ViewChild('f') slForm: NgForm;

	constructor(private shoppingListService: ShoppingListService) { }

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

	onAddItem(form: NgForm) {
		const value = form.value;
		const newIngredient = new Ingredient(value.name, value.amount);
		if (this.editMode) {
			this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
		} else {
			this.shoppingListService.addIngredient(newIngredient);
		}
		this.slForm.reset();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
