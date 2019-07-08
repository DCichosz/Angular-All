import { Injectable } from '@angular/core';
import { SharedModule } from './shared.module';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: SharedModule
})
export class SnackbarService {
  constructor(public snackbar: MatSnackBar) { }

  showErrorFromApi() {
    this.snackbar.open('Brak komunikacji z API', null, {duration: 3000});
  }
}
