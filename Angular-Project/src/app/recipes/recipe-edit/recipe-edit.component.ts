import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode = false;
	recipeForm: FormGroup;

	constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.id = +params['id'];

			this.editMode = params['id'] != null;
			console.log(this.editMode);

			this.initForm();
		});
	}

	// REACTIVE FORM APPROACH
	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';

		if (this.editMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDescription = recipe.description;
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'imagePath': new FormControl(recipeImagePath),
			'description': new FormControl(recipeDescription)
		});
	}
}
