import { createAction, props } from '@ngrx/store'
import { User } from 'src/app/model/user'

// Constant names for actions. (ActionCreators)
export const GET_ITEMS = '[User] get items'
export const GET_ONE_ITEM = '[User] get one item'
export const LOAD_ITEMS = '[User] load items'
export const LOAD_SELECTED_ITEM = '[User] load selected item'
export const ERROR_ITEMS = '[User] error item'
export const UPDATE_ITEM = '[User] update item'
export const LOAD_UPDATED_ITEM = '[User] load updated item'
export const ADD_ITEM = '[User] add item'
export const LOAD_ADDED_ITEM = '[User] load added item'
export const DELETE_ITEM = '[User] delete item'
export const REMOVE_ITEM = '[User] remove item'

// ActionCreators. (események létrehozására)
export const getItems = createAction(GET_ITEMS)
export const loadItems = createAction(LOAD_ITEMS, props<{ items: User[] }>())
export const errorItem = createAction(ERROR_ITEMS, props<{ message: string }>())

export const getOneItem = createAction(GET_ONE_ITEM, props<{ id: string | number }>())
export const loadSelectedItem = createAction(LOAD_SELECTED_ITEM, props<{ selected: User }>())

export const updateItem = createAction(UPDATE_ITEM, props<{ item: User }>())
export const loadUpdatedItem = createAction(LOAD_UPDATED_ITEM, props<{ item: User }>())

export const addItem = createAction(ADD_ITEM, props<{ item: User }>())
export const loadAddedItem = createAction(LOAD_ADDED_ITEM, props<{ item: User }>())

export const deleteItem = createAction(DELETE_ITEM, props<{ item: User }>())
export const removeDeletedItem = createAction(REMOVE_ITEM, props<{ item: User }>())
