import numeral from 'numeral';

const CURRENCY_FORMAT = '0,0.00[00]';
const NUMBER_FORMAT = '0,0';

export const formatCurrency = (amount: any, formatString?: string) => {
  return numeral(amount).format(formatString ?? CURRENCY_FORMAT);
};

export const formatNumber = (amount: any) => {
  return numeral(amount).format(NUMBER_FORMAT);
};

export const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
