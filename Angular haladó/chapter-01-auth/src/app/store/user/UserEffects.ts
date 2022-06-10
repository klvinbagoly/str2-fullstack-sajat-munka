import { catchError, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { loadItems, getItems, getOneItem, LOAD_ITEMS, ERROR_ITEMS, LOAD_SELECTED_ITEM, updateItem, LOAD_UPDATED_ITEM } from './UserActions';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { UserService } from 'src/app/service/user.service';
import { Action, Store } from '@ngrx/store';
import { User } from 'src/app/model/user';


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
      switchMap(users => of({ type: LOAD_ITEMS, items: users })),
      // Hiba esetén kiváltja az errorItem eseményt
      catchError(error => of({ type: ERROR_ITEMS, message: error }))
    )
  })

  getOneItem$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getOneItem),
      // Az utolsó adathoz hozzátesz egy újat
      withLatestFrom(this.store$),
      // megkapja az eseményt (Action) + a Store-t
      switchMap(([action, store]) => {
        // megvizsgáljuk, hogy a store-ban benne van-e már az adat
        const cache = store.users?.items?.find((item: User) => item.id === action.id)
        return cache ? of(cache) : this.userService.get(action.id)
      }),
      switchMap(user => of({ type: LOAD_SELECTED_ITEM, selected: user })),
      catchError(error => of({ type: ERROR_ITEMS, message: error }))
    )
  })

  updateItem$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      ofType(updateItem),
      switchMap(action => this.userService.update(action.item)),
      switchMap(user => of({ type: LOAD_UPDATED_ITEM, item: user })),
      catchError(error => of({ type: ERROR_ITEMS, message: error }))
    )
  })

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store$: Store<any>
  ) {

  }
}