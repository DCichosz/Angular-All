import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';

const authRoutes: Routes = [
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'signin',
		component: SigninComponent
	}
];
// uzywamy forChild, ponieważ jest to moduł z featurem a nie appmodule!!
@NgModule({
	imports: [
		RouterModule.forChild(authRoutes)
	],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
