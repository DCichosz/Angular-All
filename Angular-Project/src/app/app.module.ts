import { AppRoutingModule } from './app.routing.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RecipesModule } from './recipes/recipes.module';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ShoppingListComponent,
		ShoppingEditComponent,
		DropdownDirective,
		SigninComponent,
		SignupComponent
	],
	// routing musi byc na samym dole
	imports: [BrowserModule,
		FormsModule,
		HttpModule,
		RecipesModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
