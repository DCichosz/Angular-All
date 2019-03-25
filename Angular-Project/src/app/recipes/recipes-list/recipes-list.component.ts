import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-recipes-list',
	templateUrl: './recipes-list.component.html',
	styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
	// tslint:disable-next-line:member-ordering
	recipes: Recipe[];
	subscription: Subscription;

	constructor(
		private recipeService: RecipeService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.recipes = this.recipeService.getRecipes();
		this.subscription = this.recipeService.recipesChanged.subscribe(
			(recipes: Recipe[]) => (this.recipes = recipes)
		);
	}

	onNewRecipe() {
		this.router.navigate(['new'], { relativeTo: this.activatedRoute });
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
