import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { loadItems, getItems } from './UserActions';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { UserService } from 'src/app/service/user.service';
import { Action } from '@ngrx/store';


@Injectable()
export class UserEffect {

  // Az effectek olyan Observable-ök, melyek az azonos nevű eseményeket figyelik, az esemény bekövetkezésekor futnak le.
  loadItems$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      tap(action => console.log(action)),
      // megadjuk, melyik esemény váltsa ki az effektet. (feliratkozik az eseményre)
      ofType(getItems),
      // lekérjük a usereket.
      switchMap(() => this.userService.get()),
      // Kiváltja a loadItems eseményt, átadjuk a paramétert.
      switchMap(users => of({ type: '[User] load items', items: users })),
      // Hiba esetén kiváltja az errorItem eseményt
      catchError(error => of({ type: '[User] error item', message: error }))
    )
  })

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {

  }
}