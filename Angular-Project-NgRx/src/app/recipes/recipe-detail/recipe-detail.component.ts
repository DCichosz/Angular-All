import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredients.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	id: number;
	constructor(
		private recipeService: RecipeService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
	) { }
	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.recipe = this.recipeService.getRecipe(this.id);
		});
	}

	onAddToShoppingList(): void {
		this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
	}

	onEditRecipe(): void {
		this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
		// this.router.navigate(['../', this.id, 'edit'], {
		// 	relativeTo: this.activatedRoute
		// });
	}

	onDeleteRecipe(): void {
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['/recipes']);
	}
}
