import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

// do rzeczy wspolnych, direktyw, pipe itp robi się shared module
// trzeba zadeklarowac ale i tez EXPORTOWAC rzeczy ktore beda mogly byc uzyte przez inne moduly
// CommonModule importuje ngClass, ngModel, NgModule itp - standardowe rzeczy
@NgModule({
	declarations: [DropdownDirective],
	exports: [CommonModule, DropdownDirective]
})
export class SharedModule { }
