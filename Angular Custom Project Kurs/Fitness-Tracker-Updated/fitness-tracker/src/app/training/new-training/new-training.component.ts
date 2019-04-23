import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";

@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
	@Output() trainingStart = new EventEmitter<void>();

	constructor(private trainingService: TrainingService) {
	}

	exercises: Exercise[];

	ngOnInit() {
		this.exercises = this.trainingService.getExercises();
	}

	onStartTraining() {
		this.trainingStart.emit();
	}
}
