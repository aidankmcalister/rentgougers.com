export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};

export const formatPercent = (percent: number): string => {
  return (percent + "%").toString();
};
