import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

	exercises: Exercise[];
	exercisesSubscription: Subscription;

	constructor(private trainingService: TrainingService) {
	}

	ngOnInit() {
		this.exercisesSubscription = this.trainingService.$exercisesChanged.subscribe(exercises => this.exercises = exercises);
		this.trainingService.fetchAvailableExercises();
	}

	onStartTraining(form: NgForm) {
		this.trainingService.startExercise(form.value.exercise);
	}

	ngOnDestroy() {
		this.exercisesSubscription.unsubscribe();
	}
}
