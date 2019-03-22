import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
		private router: Router
	) {}
	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.recipe = this.recipeService.getRecipe(this.id);
		});
	}

	onAddToShoppingList(): void {
		this.recipeService.addIngredientsToShoppingList(
			this.recipe.ingredients
		);
	}

	onEditRecipe(): void {
		this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
		// this.router.navigate(['../', this.id, 'edit'], {
		// 	relativeTo: this.activatedRoute
		});
	}
}
