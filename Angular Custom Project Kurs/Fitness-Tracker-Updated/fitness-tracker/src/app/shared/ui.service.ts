import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UiService {
	loadingStateChangedSource = new Subject<boolean>();
	$loadingStateChanged = this.loadingStateChangedSource.asObservable();
}
