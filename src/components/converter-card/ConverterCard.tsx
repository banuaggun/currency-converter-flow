import { CurrencyInput } from '../currency-input/CurrencyInput';
import { ResultDisplay } from '../result-display/ResultDisplay';
import { useAppDispatch, useAppSelector, type RootState } from '../../store';
import { setAmount, setFromCurrency, setToCurrency, swapCurrencies } from '../../store/currencySlice';
import { useGetLiveRatesQuery } from '../../store/currencyApi'; 
import { CurrencyChart } from '../currency-chart/CurrencyChart';
import './converter-card.css';
import { SwitchIcon } from '../ui/icons/icons';
import { Message } from '../ui/messages/Message';

const POPULAR_CURRENCIES = new Set(["USD", "EUR", "GBP", "TRY"]);

export function ConverterCard() { 
  const dispatch = useAppDispatch();

  const amount = useAppSelector((state: RootState) => state.currency.amount);
  const fromCurrency = useAppSelector((state: RootState) => state.currency.fromCurrency);
  const toCurrency = useAppSelector((state: RootState) => state.currency.toCurrency);

  const { data: rates, isLoading, error, refetch } = useGetLiveRatesQuery(fromCurrency);

  const handleAmountChange = (value: string) => dispatch(setAmount(value));
  const handleFromChange = (currency: string) => dispatch(setFromCurrency(currency));
  const handleToChange = (currency: string) => dispatch(setToCurrency(currency));
  const handleSwap = () => dispatch(swapCurrencies());

  const targetRate = rates?.[toCurrency.toUpperCase()] || 0;
  const calculatedReceiveAmount = amount && targetRate 
    ? (parseFloat(amount) * targetRate).toFixed(2) 
    : "0.00";

  const dynamicCurrencies = (() => {
    if (!rates) return [];
    
    const allCodes = Array.from(new Set([fromCurrency.toUpperCase(), ...Object.keys(rates)]));

    return allCodes
      .map((code) => ({
        code: code,
        name: code === "TRY" ? "Turkish Lira" : `${code} Currency`, 
        isPopular: POPULAR_CURRENCIES.has(code),
      }))
      .sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return a.code.localeCompare(b.code);
      });
  })();

  return (
    <div className="converter-card">
      <h1 className="converter-title">Currency Flow</h1> 

      <div className="converter-flex-wrapper">
        
        <CurrencyInput 
          label="SEND" 
          amount={amount} 
          onChangeAmount={handleAmountChange}
          selectedCurrency={fromCurrency}
          onChangeCurrency={handleFromChange}
          currencies={dynamicCurrencies} 
        />

        <button className="inline-swap-btn" onClick={handleSwap} title="Switch Currencies">
         <SwitchIcon />
        </button>

        <CurrencyInput 
          label="RECEIVE" 
          amount={calculatedReceiveAmount} 
          selectedCurrency={toCurrency}
          onChangeCurrency={handleToChange}
          readOnly={true}
          currencies={dynamicCurrencies} 
        />

      </div>

      {isLoading ? (
        <Message text="Updating Exchange Rates..." variant="loading" />
      ) : error ? (
         <Message 
          text="Failed to fetch exchange rates. Please check your network." 
          variant="error" 
          onRetry={refetch} 
        />
      ) : (
        <>
          <ResultDisplay 
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            rates={rates || {}} 
          /> 
          <CurrencyChart base={fromCurrency} quote={toCurrency} /> 
        </>
      )}
    </div>
  );
}
