import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
	{
		path: 'recipes',
		component: RecipesListComponent
	},
	{
		path: 'shopping-list',
		component: ShoppingListComponent
	},
	{
		path: '',
		redirectTo: '/recipes',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
