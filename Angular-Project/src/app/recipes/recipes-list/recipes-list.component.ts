import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipes-list',
	templateUrl: './recipes-list.component.html',
	styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
	// tslint:disable-next-line:member-ordering

	@Output() recipeWasSelected = new EventEmitter<Recipe>();

	recipes: Recipe[] = [
		new Recipe(
			'Schabowy',
			'Przepyszny schaboszczak',
			'https://www.garneczki.pl/blog/wp-content/uploads/2018/09/Kotlet-schabowy-w-panierce-moczony-w-mleku-–-przepis-1440x960.jpg'
		),
		new Recipe(
			'Mielony',
			'Przepyszny mielony',
			'http://bi.gazeta.pl/im/e6/4a/11/z18132198Q,Przepis-na-kotlety-mielone--Najlepsze--bo-bez-udzi.jpg'
		)
	];

	constructor() {}

	ngOnInit() {}

	onRecipeSelected(recipe: Recipe) {
		this.recipeWasSelected.emit(recipe);
	}
}
