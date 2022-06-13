import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackMessageService {

  constructor(private snackbar: MatSnackBar) { }

  public show(data: any) {
    this.snackbar.open(data?.message, data?.action || 'OK', {
      duration: 4000,
      panelClass: data?.class
    });
  }

}
