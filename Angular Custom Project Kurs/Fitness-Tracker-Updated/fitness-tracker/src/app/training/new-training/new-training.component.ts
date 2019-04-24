import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UiService } from '../../shared/ui.service';

@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

	exercises: Exercise[];
	isLoading = true;
	private exercisesSubscription: Subscription;
	private loadingSubscription: Subscription;

	constructor(private trainingService: TrainingService, private uiService: UiService) {
	}

	ngOnInit() {
		this.loadingSubscription = this.uiService.$loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);

		this.exercisesSubscription = this.trainingService.$exercisesChanged
			.subscribe(exercises => {
				this.exercises = exercises;
			});
		this.trainingService.fetchAvailableExercises();
	}

	onStartTraining(form: NgForm) {
		this.trainingService.startExercise(form.value.exercise);
	}

	ngOnDestroy() {
		this.exercisesSubscription.unsubscribe();
		this.loadingSubscription.unsubscribe();
	}
}
