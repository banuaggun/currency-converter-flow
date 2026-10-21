import { useState } from "react";
import { useGetChartRatesQuery } from "../../store/currencyApi";
import "./currency-chart.css";
import { MarketStats } from "../market-stats/MarketStats";
import { CurrencyTabs } from "../currency-tabs/CurrencyTabs";
import { CurrencyCompare } from "../currency-compare/CurrencyCompare";
import { BaseChart } from "../ui/base-chart/BaseChart"; 
import { Message } from "../ui/messages/Message";

interface CurrencyChartProps {
  base: string;
  quote: string;
}

export function CurrencyChart({ base, quote }: CurrencyChartProps) {
  const [activeTab, setActiveTab] = useState<"history" | "compare">("history");
  const [days, setDays] = useState<number>(30);

  const {
    data: chartData,
    isLoading,
    error,
    refetch,
  } = useGetChartRatesQuery(
    { base, quote, days },
    { skip: base === quote } 
  );


  if (isLoading && base !== quote) {
    return <Message text="Scanning financial data..." variant="loading" />;
  }
  
  if (base !== quote && (error || !chartData || chartData.length === 0)) {
    return (
      <Message 
        text="Could not load market data for this chart. Please try again." 
        variant="error" 
        onRetry={refetch} 
      />
    );
  }

  const lastIndex = chartData ? chartData.length - 1 : 0;
  const lastRate = chartData?.[lastIndex]?.rate || 0;
  const dailyOpenRate =
    chartData && chartData.length > 1 ? chartData[lastIndex - 1].rate : lastRate;

  return (
    <div className="chart-container"> 
      <div className="chart-tabs">
        <CurrencyTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>
      
      {base === quote ? (
        <div style={{ padding: "2rem 1rem" }}>
          <Message 
            text="Cannot display historical charts for the same currency. Please select different currencies above." 
            variant="info" 
          />
        </div>
      ) : activeTab === "history" ? (
        <>
          <div className="chart-stats">
            <MarketStats open={dailyOpenRate} last={lastRate} />
          </div>
          
          <div className="chart-header-group">
            <h3 className="chart-title"> MARKET HISTORY ({days}D)</h3>
          </div>

          <BaseChart 
            data={chartData || []} 
            variant="area" 
            lineColor="#84cc16" 
            currentDays={days}
            onTimeframeChange={setDays}
          />
        </>
      ) : (
        <CurrencyCompare base={base} />
      )}
    </div>
  );
}
