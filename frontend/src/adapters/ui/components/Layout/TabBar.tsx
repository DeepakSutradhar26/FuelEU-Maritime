interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { name: 'Routes', icon: '🗺️' },
  { name: 'Compare', icon: '📊' },
  { name: 'Banking', icon: '🏦' },
  { name: 'Pooling', icon: '🔗' },
];

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => (
  <div className="bg-slate-800 border-b border-slate-700 px-6 shadow-lg">
    <div className="max-w-7xl mx-auto flex gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(tab.name)}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
            activeTab === tab.name
              ? 'border-blue-400 text-blue-400 bg-slate-700/50'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
          }`}
        >
          <span>{tab.icon}</span>
          {tab.name}
        </button>
      ))}
    </div>
  </div>
);