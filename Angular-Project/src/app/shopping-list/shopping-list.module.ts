import { NgModule } from '@angular/core';
import { ShoppingListRouterModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent,
	],
	imports: [
		FormsModule,
		CommonModule,
		ShoppingListRouterModule
	]
})
export class ShoppingListModule { }
