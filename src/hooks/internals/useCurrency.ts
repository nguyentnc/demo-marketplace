import { useAppSelector } from '@/stores';
import { ECurrency } from '@/utils/constants/general';
import { formatCurrency as formatCurrencyUtils } from '@/utils/helpers';

export function useCurrency() {
  const currentCurrency = useAppSelector((state) => state.common.currency);

  function formatPrice(amount: number, currency?: string) {
    if (currency) {
      return formatCurrencyUtils(
        amount,
        currency.toLocaleLowerCase() === ECurrency.VND ? '0,0' : '0,0.00'
      );
    } else {
      return formatCurrencyUtils(
        amount,
        currentCurrency.value === ECurrency.VND ? '0,0' : '0,0.00'
      );
    }
  }

  function formatCurrency(amount: number, currency?: string) {
    if (currency) {
      return `${formatPrice(amount, currency)} ${currency}`;
    } else {
      return `${formatPrice(amount)} ${currentCurrency.text}`;
    }
  }

  return {
    formatCurrency,
    formatPrice,
    currentCurrency,
    currency: currentCurrency.text,
  };
}

export default useCurrency;
