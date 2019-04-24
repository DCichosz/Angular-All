import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
	selector: 'app-past-trainings',
	templateUrl: './past-trainings.component.html',
	styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	dataSource = new MatTableDataSource<Exercise>();

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	finishedExercisesSubscription: Subscription;

	constructor(private trainingService: TrainingService) {
	}

	ngOnInit() {
		this.finishedExercisesSubscription = this.trainingService.$finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
			this.dataSource.data = exercises;
		});

		this.trainingService.fetchCompletedOrCanceledExercises();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	doFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
	}

	ngOnDestroy(): void {
		this.finishedExercisesSubscription.unsubscribe();
	}
}
