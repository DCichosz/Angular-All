import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Exercise } from './exercise.model';
import { UiService } from '../shared/ui.service';


@Injectable({providedIn: 'root'})
export class TrainingService {

	exerciseChangedSource: Subject<Exercise> = new Subject<Exercise>();
	$exerciseChanged = this.exerciseChangedSource.asObservable();

	exercisesChangedSource: Subject<Exercise[]> = new Subject<Exercise[]>()
	$exercisesChanged = this.exercisesChangedSource.asObservable();

	finishedExercisesChangedSource: Subject<Exercise[]> = new Subject<Exercise[]>();
	$finishedExercisesChanged = this.finishedExercisesChangedSource.asObservable();

	private availableExercises: Exercise[] = [];
	private runningExercise: Exercise;
	private finishedExercises: Exercise[] = [];

	private fbSubs: Subscription[] = [];

	constructor(private db: AngularFirestore, private uiService: UiService) {
	}

	fetchAvailableExercises() {
		this.uiService.loadingStateChangedSource.next(true);
		this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges()
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
				this.uiService.loadingStateChangedSource.next(false);
				this.availableExercises = exercises;
				this.exercisesChangedSource.next([...exercises]);
			}));
	}

	startExercise(selectedId: string) {
		// this.db.doc(`availableExercises/${ selectedId }`).update({lastSelected: new Date()});
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
		this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
			this.finishedExercises = exercises;
			this.finishedExercisesChangedSource.next(exercises);
		}));
	}

	cancelSubscriptions() {
		this.fbSubs.forEach(sub => sub.unsubscribe());
	}

	private addDataToDatabase(exercise: Exercise) {
		this.db.collection('finishedExercises').add(exercise)
	}
}
