import { AppRoutingModule } from './../app.routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [HeaderComponent, HomeComponent],
	imports: [SharedModule, AppRoutingModule],
	exports: [AppRoutingModule, HeaderComponent, HomeComponent]
})
export class CoreModule {}
