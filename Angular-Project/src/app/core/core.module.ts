import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './../shared/auth.interceptor';
import { AppRoutingModule } from './../app.routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [HeaderComponent, HomeComponent],
	imports: [SharedModule, AppRoutingModule],
	exports: [AppRoutingModule, HeaderComponent, HomeComponent],
	// dodanie interceptora
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	]
})
export class CoreModule {}
