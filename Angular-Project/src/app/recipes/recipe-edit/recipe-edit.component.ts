import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

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
		// const newRecipe = new Recipe(this.recipeForm.value['name'],
		// 	this.recipeForm.value['description'],
		// 	this.recipeForm.value['imagePath'],
		// 	this.recipeForm.value['ingredients']);
		// zamiast uzywac tego wyzej w parametrze metody
		// mozna uzyc this.recipeForm.value


		if (this.editMode) {
			this.recipeService.updateRecipe(this.id, this.recipeForm.value);
		} else {
			this.recipeService.addRecipe(this.recipeForm.value);
		}
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
				'name': new FormControl(null, Validators.required),
				'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
			})
		);
	}

	// REACTIVE FORM APPROACH
	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';
		const recipeIngredients = new FormArray([]);

		if (this.editMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDescription = recipe.description;
			if (recipe.ingredients) {
				for (const ingredient of recipe.ingredients) {
					recipeIngredients.push(new FormGroup({
						'name': new FormControl(ingredient.name, Validators.required),
						'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
					}));
				}
			}
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'imagePath': new FormControl(recipeImagePath, Validators.required),
			'description': new FormControl(recipeDescription, Validators.required),
			'ingredients': recipeIngredients
		});
	}

	getControls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}
}
