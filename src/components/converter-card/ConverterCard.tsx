import { CurrencyInput } from '../currency-input/CurrencyInput';
import { ResultDisplay } from '../result-display/ResultDisplay';
import { useAppDispatch, useAppSelector, type RootState } from '../../store';
import { setAmount, setFromCurrency, setToCurrency, swapCurrencies } from '../../store/currencySlice';
import { useGetLiveRatesQuery } from '../../store/currencyApi'; 
import { CurrencyChart } from '../currency-chart/CurrencyChart';
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

  const targetRate = rates?.[toCurrency.toUpperCase()] || 0;
  const calculatedReceiveAmount = amount && targetRate 
    ? (parseFloat(amount) * targetRate).toFixed(2) 
    : "0.00";

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
        />

        <button className="inline-swap-btn" onClick={handleSwap} title="Kurları Değiştir">
          ⇄
        </button>

        <CurrencyInput 
          label="RECEIVE" 
          amount={calculatedReceiveAmount} 
          selectedCurrency={toCurrency}
          onChangeCurrency={handleToChange}
          readOnly={true}
        />

      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--accent-color)', fontWeight: 600 }}>
          Kurlar Güncelleniyor...
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', color: '#ef4444', fontWeight: 600 }}>
          Kur verisi alınamadı.
        </div>
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
