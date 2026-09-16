// src/components/result-display/ResultDisplay.tsx
import './result-display.css';

interface ResultDisplayProps {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
}

export function ResultDisplay({ amount, fromCurrency, toCurrency }: ResultDisplayProps) {
  // Sayısal miktar kontrolü (Boş veya geçersizse 0 kabul et)
  const numericAmount = parseFloat(amount) || 0;
  
  // Şimdilik test amaçlı sabit kur oranı (İleride Redux/API'den gelecek)
  const mockRate = 34.25; 
  const totalResult = (numericAmount * mockRate).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Güncel Türkiye tarihini havalı bir formatta gösterelim
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="result-section">
      {/* Büyük Ana Sonuç */}
      <div className="result-main">
        {numericAmount.toLocaleString('tr-TR')} {fromCurrency} = {totalResult} {toCurrency}
      </div>
      
      {/* Parite Bilgisi */}
      <div className="result-rate">
        1 {fromCurrency} = {mockRate} {toCurrency}
      </div>
      
      {/* Güncellenme Tarihi */}
      <div className="result-date">
        Son Güncelleme: {currentDate}
      </div>
    </div>
  );
}
