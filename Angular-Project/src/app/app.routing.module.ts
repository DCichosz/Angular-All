import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
	{
		path: '**',
		redirectTo: '/recipes'
	}
];
// dla routingu ogolnego uzywamy forRoot
@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
