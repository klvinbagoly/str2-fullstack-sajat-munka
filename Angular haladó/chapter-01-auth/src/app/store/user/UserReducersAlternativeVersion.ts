import { loadItems, errorItem, flushError, removeDeletedItem, loadAddedItem, loadUpdatedItem, loadSelectedItem } from './UserActions';
import { User } from "src/app/model/user";
import { createReducer, on } from '@ngrx/store';
import { tap } from 'rxjs';


export interface State { items: User[], selected?: User | null, error: any }


export const initialState: State = { items: [], selected: null, error: null }


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
    error: action.error
  })),
  on(flushError, (state, action) => ({
    ...state,
    error: null
  }))
)

// A selectorok lekérdezik az adatokat a Store-ból.

export const selectError = (states: { users: State }) => states.users.error?.error
export const selectItems = (states: { users: State }) => {
  console.log(states)
  return states.users.items
}

export const selectOneItem = (states: { users: State }) => ({ ...states.users.selected })