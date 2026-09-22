import { ConverterCard } from './components/converter-card/ConverterCard';
import { CurrencyPairs } from './components/currency-pairs/CurrencyPairs'; 

export default function App() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <ConverterCard />
      </div>

      <div className="dashboard-right">
        <CurrencyPairs />
      </div> 
      
    </div>
  );
}
