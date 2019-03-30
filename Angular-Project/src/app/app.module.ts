import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent
	],
	// routing musi byc na samym dole
	imports: [
		BrowserModule,
		HttpModule,
		AuthModule,
		SharedModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
