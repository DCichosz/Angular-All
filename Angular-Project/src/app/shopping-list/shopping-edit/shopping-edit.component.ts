import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
	@ViewChild('nameInput') nameInputRef: ElementRef;
	@ViewChild('amountInput') amountInputRef: ElementRef;

	constructor(private shoppingListService: ShoppingListService) {}

	ngOnInit() {}

	onAddItem() {
		this.shoppingListService.addIngredient(
			new Ingredient(
				this.nameInputRef.nativeElement.value,
				this.amountInputRef.nativeElement.value
			)
		);
	}
}
