import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../common/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  openDialog(data: any): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data
    })
    return dialogRef.afterClosed()
  }

  openSnackbar(duration: number, message: string = 'Hello') {
    this.snackbar.open(message, 'Ok', { duration })
  }

}
