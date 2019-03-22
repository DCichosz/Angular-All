import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode = false;

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.id = +params['id'];

			this.editMode = params['id'] != null;
			console.log(this.editMode);
		});
	}
}
