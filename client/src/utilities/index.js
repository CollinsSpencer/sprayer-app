import { Units } from '../actions'
/*
 * Amount in units converted to amount in ounces
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
 * Price per unit converted to price per ounce
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

export const calculateCost = (price, priceUnit, amount, amountUnit) => {
  if (priceUnit === amountUnit) {
    return (price * amount).toFixed(2);
  }
  else {
    switch (priceUnit) {
      case "GALLONS":
        price /= 128
        break;
      case "LITERS":
        price /= 33.814022
        break;
      case "OUNCES":
      default:
        break;
    }
    switch (amountUnit) {
      case "GALLONS":
        amount *= 128
        break;
      case "LITERS":
        amount *= 33.814022
        break;
      case "OUNCES":
      default:
        break;
    }
    return (price * amount).toFixed(2);
  }
}

export const convertDateToServerFormat = (date) => {
  let dateString = date.toString()
  if (date instanceof Date) {
    dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
  }
  return dateString
}