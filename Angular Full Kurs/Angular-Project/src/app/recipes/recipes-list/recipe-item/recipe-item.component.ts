import { RecipeService } from './../../recipe.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
	@Input() index: number;
	recipe: Recipe;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.recipe = this.recipeService.getRecipe(this.index);
	}
}
