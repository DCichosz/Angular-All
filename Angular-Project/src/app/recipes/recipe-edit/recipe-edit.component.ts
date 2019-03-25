import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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

	onSubmit(): void {
		console.log(this.recipeForm);
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
				'name': new FormControl(),
				'amount': new FormControl()
			})
		)
	}

	// REACTIVE FORM APPROACH
	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';
		let recipeIngredients = new FormArray([]);

		if (this.editMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDescription = recipe.description;
			if (recipe.ingredients) {
				for (const ingredient of recipe.ingredients) {
					recipeIngredients.push(new FormGroup({
						'name': new FormControl(ingredient.name),
						'amount': new FormControl(ingredient.amount)
					}));
				}
			}
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName),
			'imagePath': new FormControl(recipeImagePath),
			'description': new FormControl(recipeDescription),
			'ingredients': recipeIngredients
		});
	}

	getControls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}
}
