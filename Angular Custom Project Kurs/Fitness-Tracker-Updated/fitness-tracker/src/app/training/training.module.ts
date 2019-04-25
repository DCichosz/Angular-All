import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { MaterialModule } from '../material.module';

@NgModule({
	declarations: [
		TrainingComponent,
		CurrentTrainingComponent,
		NewTrainingComponent,
		PastTrainingsComponent,
		StopTrainingComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		FlexLayoutModule,
		AngularFirestoreModule,
		FormsModule
	],
	entryComponents: [StopTrainingComponent]
})
export class TrainingModule {
}
