import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	// Lazy Loading na Recipes !!
	{
		path: 'recipes',
		loadChildren: './recipes/recipes.module#RecipesModule'
	},
	{
		path: 'shopping-list',
		loadChildren: './shopping-list/shopping-list.module#ShoppingListModule',
		canLoad: [AuthGuard],
		// canLoad sprawdza PRZED pobraniem / wejsciem czy w ogole mozesz
		// co pozwala zachowac lazyloading
	},
	{
		path: '**',
		component: HomeComponent
	}
];
// dla routingu ogolnego uzywamy forRoot
@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
