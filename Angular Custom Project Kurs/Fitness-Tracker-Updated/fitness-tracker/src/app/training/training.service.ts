import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Exercise } from './exercise.model';


@Injectable({providedIn: 'root'})
export class TrainingService {
	private availableExercises: Exercise[] = [];
	private runningExercise: Exercise;
	private finishedExercises: Exercise[] = [];

	exerciseChangedSource: Subject<Exercise> = new Subject<Exercise>();
	$exerciseChanged = this.exerciseChangedSource.asObservable();

	exercisesChangedSource: Subject<Exercise[]> = new Subject<Exercise[]>()
	$exercisesChanged = this.exercisesChangedSource.asObservable();

	finishedExercisesChangedSource: Subject<Exercise[]> = new Subject<Exercise[]>();
	$finishedExercisesChanged = this.finishedExercisesChangedSource.asObservable();

	constructor(private db: AngularFirestore) {
	}

	fetchAvailableExercises() {
		return this.db.collection('availableExercises').snapshotChanges()
			.pipe(map(docArray => {
				return docArray.map(doc => {
					return {
						id: doc.payload.doc.id,
						name: doc.payload.doc.get('name'),
						duration: doc.payload.doc.get('duration'),
						calories: doc.payload.doc.get('calories')
					};
				});
			})).subscribe((exercises: Exercise[]) => {
				this.availableExercises = exercises;
				this.exercisesChangedSource.next([...exercises]);
			});
	}

	startExercise(selectedId: string) {
		this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
		this.exerciseChangedSource.next({...this.runningExercise});
	}


	completeExercise() {
		this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
		this.runningExercise = null;
		this.exerciseChangedSource.next(null);
	}


	cancelExercise(progress: number) {
		this.addDataToDatabase({
			...this.runningExercise,
			duration: this.runningExercise.duration * (progress / 100),
			calories: this.runningExercise.calories * (progress / 100),
			date: new Date(),
			state: 'canceled'
		});
		this.runningExercise = null;
		this.exerciseChangedSource.next(null);
	}

	getRunningExercise() {
		return {...this.runningExercise};
	}

	fetchCompletedOrCanceledExercises() {
		this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
			this.finishedExercises = exercises;
			this.finishedExercisesChangedSource.next(exercises);
		});
	}

	private addDataToDatabase(exercise: Exercise) {
		this.db.collection('finishedExercises').add(exercise)
	}
}
