// src/components/converter-card/ConverterCard.tsx
import { useState } from 'react';
import { CurrencyInput } from '../currency-input/CurrencyInput';
import { CurrencySelect } from '../currency-select/CurrencySelect';
import { ResultDisplay } from '../result-display/ResultDisplay'; // Yeni bileşeni import ettik
import './converter-card.css';

export function ConverterCard() { 
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("TRY");

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="converter-card">
      <h1 className="converter-title">Currency Flow</h1> 

      {/* Miktar Giriş Alanı */}
      <CurrencyInput amount={amount} onChangeAmount={setAmount} />
      
      {/* Döviz Seçim Alanı */}
      <CurrencySelect 
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onChangeFrom={setFromCurrency}
        onChangeTo={setToCurrency}
        onSwap={handleSwap}
      />

      {/* Gerçek Sonuç Ekranı */}
      <ResultDisplay 
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    </div>
  );
}
