import "./currency-tabs.css";

interface CurrencyTabsProps {
  activeTab: "history" | "compare";
  onChange: (tab: "history" | "compare") => void;
}

export function CurrencyTabs({ activeTab, onChange }: CurrencyTabsProps) {
  return (
    <div className="tabs-navigation">
      <button
        className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
        onClick={() => onChange("history")}
      >
        HISTORY
      </button>
      <button
        className={`tab-btn ${activeTab === "compare" ? "active" : ""}`}
        onClick={() => onChange("compare")}
      >
        COMPARE
      </button>
    </div>
  );
}
