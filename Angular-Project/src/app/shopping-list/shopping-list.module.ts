import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListRouterModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent,
	],
	imports: [
		FormsModule,
		SharedModule,
		ShoppingListRouterModule
	]
})
export class ShoppingListModule { }
