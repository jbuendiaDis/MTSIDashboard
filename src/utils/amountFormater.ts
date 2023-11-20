export const formatToCurrency = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);

  return formattedAmount;
};
