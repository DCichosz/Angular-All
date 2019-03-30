import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const shoppingListRoutes: Routes = [
	{
		path: 'shopping-list',
		component: ShoppingListComponent
	},

];
// uzywamy forChild, ponieważ jest to moduł z featurem a nie appmodule!!
@NgModule({
	imports: [
		RouterModule.forChild(shoppingListRoutes)
	],
	exports: [RouterModule]
})
export class ShoppingListRouterModule { }
