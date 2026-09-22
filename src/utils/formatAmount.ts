export const formatAmount = (amount: number): string =>
  `${new Intl.NumberFormat("ka-GE").format(amount)} ₾`;
