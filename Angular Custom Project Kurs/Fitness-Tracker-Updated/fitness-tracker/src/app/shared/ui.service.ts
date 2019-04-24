import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({providedIn: 'root'})
export class UiService {
	loadingStateChangedSource = new Subject<boolean>();
	$loadingStateChanged = this.loadingStateChangedSource.asObservable();

	constructor(private snackbar: MatSnackBar) {
	}

	showSnackbar(message, action, duration) {
		this.snackbar.open(message, action, {duration: duration})
	}
}
