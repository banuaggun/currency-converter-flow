import { CurrencyInput } from '../currency-input/CurrencyInput';
import { CurrencySelect } from '../currency-select/CurrencySelect';
import { ResultDisplay } from '../result-display/ResultDisplay';
import { useAppDispatch, useAppSelector, type RootState } from '../../store';
import { setAmount, setFromCurrency, setToCurrency, swapCurrencies } from '../../store/currencySlice';
import { useGetLiveRatesQuery } from '../../store/currencyApi'; 
import './converter-card.css';

export function ConverterCard() { 
  const dispatch = useAppDispatch();

  const amount = useAppSelector((state: RootState) => state.currency.amount);
  const fromCurrency = useAppSelector((state: RootState) => state.currency.fromCurrency);
  const toCurrency = useAppSelector((state: RootState) => state.currency.toCurrency);

  const { data: rates, isLoading, error } = useGetLiveRatesQuery(fromCurrency);

  const handleAmountChange = (value: string) => dispatch(setAmount(value));
  const handleFromChange = (currency: string) => dispatch(setFromCurrency(currency));
  const handleToChange = (currency: string) => dispatch(setToCurrency(currency));
  const handleSwap = () => dispatch(swapCurrencies());

  return (
    <div className="converter-card">
      <h1 className="converter-title">Currency Flow</h1> 

      <CurrencyInput amount={amount} onChangeAmount={handleAmountChange} />
      
      <CurrencySelect 
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onChangeFrom={handleFromChange}
        onChangeTo={handleToChange}
        onSwap={handleSwap}
      />

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--accent-color)', fontWeight: 600 }}>
          Kurlar Güncelleniyor...
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', color: '#ef4444', fontWeight: 600 }}>
          Kur verisi alınamadı.
        </div>
      ) : (

        <ResultDisplay 
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rates={rates || {}} 
        />
      )}
    </div>
  );
}
