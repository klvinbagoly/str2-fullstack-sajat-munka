import { loadItems, errorItem, loadSelectedItem, loadUpdatedItem, loadAddedItem, removeDeletedItem } from './UserActions';
import { User } from "src/app/model/user";
import { createReducer, on } from '@ngrx/store';
import { tap } from 'rxjs';


export interface State {
  [x: string]: any,
  users: { items: User[], selected?: User | null, error: string }
}

export const initialState: State = {
  users: { items: [], selected: null, error: '' }
}

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
  // Egy user lekérése.
  on(loadSelectedItem, (state, action) => {
    console.log(state)
    return {
      ...state,
      selected: action.selected
    }
  }),
  on(loadUpdatedItem, (state, action) => {
    console.log(state)
    return {
      ...state,
      items: ((users): User[] => {
        const index = users['items'].findIndex((item: User) => item.id === action.item.id)
        const newItems = [...users['items']]
        newItems[index] = action.item
        return newItems
      })(state)
    }
  }),
  on(loadAddedItem, (state, action) => ({
    ...state,
    items: (state['items'] as User[]).concat(action.item)
  })),
  on(removeDeletedItem, (state, action) => ({
    ...state,
    items: (state['items'] as User[]).filter(item => item.id !== action.item.id)
  })),

  on(errorItem, (state, action) => ({
    ...state,
    error: action.message
  }))
)

// A selectorok lekérdezik az adatokat a Store-ból.

export const selectError = (state: State) => state.users.error
export const selectItems = (state: State) => {
  console.log(state)
  return state.users.items
}

// A Store-ban tárolt adatok nem módosíthatóak (immutable), ezért le kell másolni
// az Object.assign() metódussal, hogy az űrlapon szerkeszthető legyen.
export const selectOneItem = (state: State) => ({ ...state.users.selected })