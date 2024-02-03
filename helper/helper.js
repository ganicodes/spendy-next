export const convertDateToLocaleDateString = (date) => {
  // converting to locale date string
  let newDate = new Date(date);
  return newDate.toLocaleDateString();
};

export function isValidDate(d) {
  // to check if a date is valid date or not
  return d instanceof Date && !isNaN(d);
}

export function convertToCurrencyString(amount, currencyType) {
  // function used to convert amount into currency format
  // for now only conver into Indian currency format i.e ...lakhs,thousand,hunderds
  // currency: "INR",
  // locale -> 'en-US' for US conversion
  // currencyType -> INR or USD symbol etc
  if (amount) {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: currencyType,
    });
  } else {
    return 0;
  }
}
