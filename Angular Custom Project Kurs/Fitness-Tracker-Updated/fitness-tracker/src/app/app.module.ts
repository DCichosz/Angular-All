import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';


@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent,
		HeaderComponent,
		SidenavListComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		AppRoutingModule,
		FlexLayoutModule,
		AngularFireAuthModule,
		AuthModule,
		TrainingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
