import { NgModule } from '@angular/core';
import { DropdownDirective } from '../shared/dropdown.directive';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routing.module';
import { RecipesRoutingModule } from './recipes-routing.module';


@NgModule({
	declarations: [
		RecipesComponent,
		RecipeStartComponent,
		RecipesListComponent,
		RecipeItemComponent,
		RecipeEditComponent,
		RecipeDetailComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RecipesRoutingModule
	]
})
export class RecipesModule { }
