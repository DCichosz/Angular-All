import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AppRoutingModule } from './app.routing.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		RecipesComponent,
		RecipesListComponent,
		RecipeItemComponent,
		ShoppingListComponent,
		ShoppingEditComponent,
		RecipeDetailComponent,
		DropdownDirective,
		RecipeStartComponent,
		RecipeEditComponent
	],
	imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
