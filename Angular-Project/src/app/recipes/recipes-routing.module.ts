import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipesRoutes: Routes = [
	{
		path: '',
		component: RecipesComponent,
		children: [
			{
				path: '',
				component: RecipeStartComponent,
			},
			{
				path: 'new',
				component: RecipeEditComponent,
				canActivate: [AuthGuard]
			},
			{
				path: ':id',
				component: RecipeDetailComponent,
			},
			{
				path: ':id/edit',
				component: RecipeEditComponent,
				canActivate: [AuthGuard]
			}
		]
	},
];
// uzywamy forChild, ponieważ jest to moduł z featurem a nie appmodule!!
@NgModule({
	imports: [
		RouterModule.forChild(recipesRoutes)
	],
	exports: [RouterModule]
})
export class RecipesRoutingModule { }
