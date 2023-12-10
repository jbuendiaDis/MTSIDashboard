export const formatToCurrency = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);

  return formattedAmount;
};

export const parseCurrencyStringToNumber = (
  formattedAmount: string
): number | null => {
  const numericValue = Number(formattedAmount.replace(/[^\d.-]/g, ''));

  return isNaN(numericValue) ? null : numericValue;
};
