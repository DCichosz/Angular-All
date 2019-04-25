import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
	declarations: [
		SignupComponent,
		LoginComponent
	],
	imports: [
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		SharedModule,
		AuthRoutingModule
	],
	exports: []
})
export class AuthModule {

}
