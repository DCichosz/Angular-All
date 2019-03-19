import { Ingredient } from './../../shared/ingredients.model';
import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	Output,
	EventEmitter
} from '@angular/core';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
	@ViewChild('nameInput') nameInputRef: ElementRef;
	@ViewChild('amountInput') amountInputRef: ElementRef;

	@Output() ingredientAdded = new EventEmitter<Ingredient>();

	constructor() {}

	ngOnInit() {}

	onAddItem() {
		this.ingredientAdded.emit(
			new Ingredient(
				this.nameInputRef.nativeElement.value,
				this.amountInputRef.nativeElement.value
			)
		);
	}
}
