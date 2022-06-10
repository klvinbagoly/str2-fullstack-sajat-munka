import { createAction, props } from '@ngrx/store'
import { User } from 'src/app/model/user'

// Constant names for actions. (ActionCreators)
export const GET_ITEMS = '[User] get items'
export const GET_ONE_ITEM = '[User] get one item'
export const LOAD_ITEMS = '[User] load items'
export const LOAD_SELECTED_ITEM = '[User] load selected item'
export const ERROR_ITEMS = '[User] error item'

// ActionCreators. (események létrehozására)
export const getItems = createAction(GET_ITEMS)
export const loadItems = createAction(LOAD_ITEMS, props<{ items: User[] }>())
export const errorItem = createAction(ERROR_ITEMS, props<{ message: string }>())

export const getOneItem = createAction(GET_ONE_ITEM, props<{ id: string | number }>())
export const loadSelectedItem = createAction(LOAD_SELECTED_ITEM, props<{ selected: User }>())
