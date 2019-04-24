import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
	maxDate: Date;
	isLoading = false;

	private loadingSubscription: Subscription;

	constructor(private authService: AuthService, private uiService: UiService) {
	}

	ngOnInit() {
		this.loadingSubscription = this.uiService.$loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
		this.maxDate = new Date();
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
	}

	onSubmit(signupForm: NgForm) {
		this.authService.registerUser({
			email: signupForm.value.email,
			password: signupForm.value.password
		});
	}

	ngOnDestroy(): void {
		this.loadingSubscription.unsubscribe();
	}
}
