/*
 * action types
 */

export const SET_MODE = 'SET_MODE'
export const SET_UNITS = 'SET_UNITS'
export const SET_FIELD = 'SET_FIELD'
export const ADD_FIELD = 'ADD_FIELD'
export const SET_OWNER = 'SET_OWNER'
export const ADD_OWNER = 'ADD_OWNER'
export const SET_SPRAY = 'SET_SPRAY'
export const ADD_SPRAY = 'ADD_SPRAY'

/*
 * other constants
 */

export const Modes = {
  PLANTING: 'PLANTING',
  SPRAYING: 'SPRAYING',
  HARVESTING: 'HARVESTING',
}

export const Units = {
  GALLONS: 'GALLONS',
  QUARTS: 'QUARTS',
  LITERS: 'LITERS',
}

/*
 * action creators
 */

export const setModeToPlanting = () => ({ type: SET_MODE, mode: Modes.PLANTING })
export const setModeToSpraying = () => ({ type: SET_MODE, mode: Modes.SPRAYING })
export const setModeToHarvesting = () => ({ type: SET_MODE, mode: Modes.HARVESTING })
export const setUnitsToGallons = () => ({ type: SET_UNITS, mode: Units.GALLONS })
export const setUnitsToQuarts = () => ({ type: SET_UNITS, mode: Units.QUARTS })
export const setUnitsToLiters = () => ({ type: SET_UNITS, mode: Units.LITERS })
export const setField = (id) => ({ type: SET_FIELD, id: id })
export const addField = (field_name) => ({ type: ADD_FIELD, field_name: field_name })
export const setOwner = (id) => ({ type: SET_OWNER, id: id })
export const addOwner = (owner_name) => ({ type: ADD_OWNER, owner_name: owner_name })
export const setSpray = (id) => ({ type: SET_SPRAY, id: id })
export const addSpray = (spray_name) => ({ type: ADD_SPRAY, spray_name: spray_name })
