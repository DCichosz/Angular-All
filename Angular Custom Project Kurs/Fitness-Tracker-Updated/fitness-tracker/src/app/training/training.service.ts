import { Exercise } from './exercise.model';
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TrainingService {
	availableExercises: Exercise[] = [
		{id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
		{id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
		{id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
		{id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
	];

	getExercises(): Exercise[] {
		return [...this.availableExercises];
	}
}
