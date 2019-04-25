import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';

@NgModule({
	declarations: [
		SignupComponent,
		LoginComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		FlexLayoutModule,
		AngularFireModule.initializeApp(environment.firebase),
	],
	exports: []
})
export class AuthModule {

}
