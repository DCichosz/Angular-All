import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [MatSnackBarModule, BrowserAnimationsModule],
  exports: [MatSnackBarModule, BrowserAnimationsModule]
})
export class SharedModule {}
