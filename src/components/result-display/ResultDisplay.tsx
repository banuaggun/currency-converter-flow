import './result-display.css';

interface ResultDisplayProps {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  rates: { [key: string]: number }; 
}

export function ResultDisplay({ amount, fromCurrency, toCurrency, rates }: ResultDisplayProps) {
  const numericAmount = parseFloat(amount) || 0;
  const currentRate = fromCurrency === toCurrency ? 1 : (rates[toCurrency] || 1);
  
  const totalResult = (numericAmount * currentRate).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const currentDate = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="result-section">
      <div className="result-main">
        {numericAmount.toLocaleString('tr-TR')} {fromCurrency} = {totalResult} {toCurrency}
      </div>
      <div className="result-rate">
        1 {fromCurrency} = {currentRate.toFixed(4)} {toCurrency}
      </div>
      <div className="result-date">
        Son Güncelleme: {currentDate}
      </div>
    </div>
  );
}
