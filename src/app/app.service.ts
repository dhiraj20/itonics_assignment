import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _snackBar = inject(MatSnackBar);
  constructor() {}

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
