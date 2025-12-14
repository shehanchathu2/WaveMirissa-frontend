export const calculateFinalPrice = (item) => {
  const basePrice = item.price || 0;
  const customizationTotal = item.customizations?.reduce(
    (acc, c) => acc + (c.price || 0), 
    0
  ) || 0;

  return basePrice + customizationTotal;
};