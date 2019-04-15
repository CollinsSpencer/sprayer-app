/*
 * action types
 */

export const SET_MODE = 'SET_MODE'
export const SET_FIELD = 'SET_FIELD'
export const ADD_FIELD = 'ADD_FIELD'

/*
 * other constants
 */

export const Modes = {
  PLANTING: 'PLANTING',
  SPRAYING: 'SPRAYING',
  HARVESTING: 'HARVESTING',
}

/*
 * action creators
 */

export const setModeToPlanting = () => ({ type: SET_MODE, mode: Modes.PLANTING })
export const setModeToSpraying = () => ({ type: SET_MODE, mode: Modes.SPRAYING })
export const setModeToHarvesting = () => ({ type: SET_MODE, mode: Modes.HARVESTING })
export const setField = (id) => ({ type: SET_FIELD, id: id })
export const addField = (field_name) => ({ type: ADD_FIELD, field_name: field_name })
