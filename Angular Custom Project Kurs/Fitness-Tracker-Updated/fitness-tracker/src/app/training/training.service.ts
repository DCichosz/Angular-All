import { Exercise } from './exercise.model';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class TrainingService {
	private availableExercises: Exercise[] = [
		{id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
		{id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
		{id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
		{id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
	];

	private runningExercise: Exercise;

	exerciseChangedSource: Subject<Exercise> = new Subject<Exercise>();
	$exerciseChanged = this.exerciseChangedSource.asObservable();

	getExercises(): Exercise[] {
		return [...this.availableExercises];
	}

	startExercise(selectedId: string) {
		this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
		this.exerciseChangedSource.next({...this.runningExercise});
	}

	getRunningExercise() {
		return {...this.runningExercise};
	}
}
