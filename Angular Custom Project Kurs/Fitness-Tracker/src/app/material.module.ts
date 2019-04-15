import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule],
  exports: [MatButtonModule, MatIconModule, MatFormFieldModule]
})
export class MaterialModule {}
