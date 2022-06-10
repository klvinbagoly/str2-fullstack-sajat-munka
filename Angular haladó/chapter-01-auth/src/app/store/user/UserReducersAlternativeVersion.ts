import { loadItems, errorItem } from './UserActions';
import { User } from "src/app/model/user";
import { createReducer, on } from '@ngrx/store';
import { tap } from 'rxjs';


export interface State { items: User[], error: string }


export const initialState: State = { items: [], error: '' }


// ActionReducer: Az eseményekből eltárolja az adatokat a Store-ban.
export const UserReducer = createReducer(
  initialState,
  // Eseményfigyelő függvény: eltárolja az adatokat a Store-ban.
  on(loadItems, (state, action) => {
    console.log(state)
    return {
      ...state,
      items: action.items
    }
  }),
  on(errorItem, (state, action) => ({
    ...state,
    error: action.message
  }))
)

// A selectorok lekérdezik az adatokat a Store-ból.

export const selectError = (states: { users: State }) => states.users.error
export const selectItems = (states: { users: State }) => {
  console.log(states)
  return states.users.items
}