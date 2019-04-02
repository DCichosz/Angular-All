import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';

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
		canLoad: [AuthGuard]
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
	// preloading lazy loaded routes
	imports: [
		RouterModule.forRoot(appRoutes, {
			preloadingStrategy: PreloadAllModules
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
