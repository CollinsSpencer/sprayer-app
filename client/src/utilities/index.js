import { Units } from '../actions'
/*
 * Amount in units needs to be converted to amount in ounces
 */
export const amountConverter = (amountValue, amountUnits) => {
  switch (amountUnits) {
    case Units.GALLONS:
      return amountValue / 128
    case Units.LITERS:
      return amountValue / 33.814022
    case Units.OUNCES:
      return amountValue
    default:
      return amountValue
  }
}

/*
 * Price per unit needs to be converted to price per ounce
 */
export const priceConverter = (priceValue, priceUnits) => {
  switch (priceUnits) {
    case Units.GALLONS:
      return priceValue * 128
    case Units.LITERS:
      return priceValue * 33.814022
    case Units.OUNCES:
      return priceValue
    default:
      return priceValue
  }
}