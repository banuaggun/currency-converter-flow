import { useGetMarketSnapshotQuery } from '../../store/pairsApi'; 
import './currency-pairs.css';

interface SnapshotPair {
  base: string;
  quote: string;
}

export function CurrencyPairs() {
  const { data: todayRates, isLoading: isTodayLoading, error: todayError, refetch } = useGetMarketSnapshotQuery();

  const getYesterdayDateString = (): string => {
    const d = new Date();
    const dayOfWeek = d.getDay();
    const offset = dayOfWeek === 1 ? 3 : 1; 
    d.setDate(d.getDate() - offset);
    return d.toISOString().split('T')[0];
  };

  const { data: yesterdayRates, isLoading: isYesterdayLoading } = useGetMarketSnapshotQuery(getYesterdayDateString());

  const marketSnapshotPairs: SnapshotPair[] = [
    { base: "EUR", quote: "USD" },
    { base: "USD", quote: "JPY" },
    { base: "GBP", quote: "USD" },
    { base: "USD", quote: "CHF" },
    { base: "EUR", quote: "GBP" },
    { base: "AUD", quote: "USD" },
    { base: "USD", quote: "CAD" },
  ];

  if (isTodayLoading || isYesterdayLoading) {
    return <div className="pairs-card" style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>Piyasa Verileri Yükleniyor...</div>;
  }

  if (todayError || !todayRates) {
    return <div className="pairs-card" style={{ color: '#ef4444', textAlign: 'center', padding: '3rem' }}>Kurlar çekilemedi.</div>;
  }

  return (
    <div className="pairs-card">
      <div className="pairs-header">
        <div>
          <h2 className="pairs-title">Market Snapshot</h2>
          <div className="pairs-subtitle">Canlı Majör Pariteler (100% Real)</div>
        </div>
        <button className="pairs-refresh-btn" onClick={() => refetch()} title="Kurları Yenile">↻</button>
      </div>

      <div className="pairs-list-wrapper">
        {marketSnapshotPairs.map((pair, index) => {
          const base = pair.base.toUpperCase();
          const quote = pair.quote.toUpperCase();

          const calculateRate = (pool: { [key: string]: number } | undefined) => {
            if (!pool) return null;
            if (pool[`${base}_${quote}`] !== undefined) return pool[`${base}_${quote}`];
            if (pool[`${quote}_${base}`] !== undefined && pool[`${quote}_${base}`] > 0) return 1 / pool[`${quote}_${base}`];
            
            const eurToBase = pool[`EUR_${base}`];
            const eurToQuote = pool[`EUR_${quote}`];
            if (eurToBase && eurToQuote && eurToBase > 0) return eurToQuote / eurToBase;
            return null;
          };

          const currentPairRate = calculateRate(todayRates);
          const yesterdayPairRate = calculateRate(yesterdayRates);

          let percentageValue = "0.00";
          let isPositive = true;

          if (currentPairRate && yesterdayPairRate) {
            const change = currentPairRate - yesterdayPairRate;
            const percentage = (change / yesterdayPairRate) * 100;
            
            isPositive = percentage >= 0;
            percentageValue = Math.abs(percentage).toFixed(2);
          }

          return (
            <div key={index} className="pair-row">
              <span className="pair-name">{pair.base}/{pair.quote}</span>
              
              <span className="pair-value">
                {currentPairRate !== null ? currentPairRate.toFixed(4) : "—"}
              </span>
              
              <span className={`pair-percentage ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? `▲ +${percentageValue}%` : `▼ -${percentageValue}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
