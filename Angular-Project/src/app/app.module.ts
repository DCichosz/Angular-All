import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, HttpModule, AuthModule, SharedModule, CoreModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
