import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { TrainingService } from "./training.service";

@Component({
	selector: 'app-training',
	templateUrl: './training.component.html',
	styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
	ongoingTraining = false;
	exerciseSubscription: Subscription;

	constructor(private trainingService: TrainingService) {
	}

	ngOnInit() {
		this.exerciseSubscription = this.trainingService.$exerciseChanged.subscribe(exercise => {
			this.ongoingTraining = exercise ? false : true;
		});
	}

	ngOnDestroy() {
		this.exerciseSubscription.unsubscribe();
	}
}
