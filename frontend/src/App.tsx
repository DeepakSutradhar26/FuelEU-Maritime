import { useState } from 'react';
import { Navbar } from './adapters/ui/components/Layout/Navbar';
import { TabBar } from './adapters/ui/components/Layout/TabBar';
import { RoutesTab } from './adapters/ui/components/routes/RoutesTab';
import { CompareTab } from './adapters/ui/components/compare/CompareTab';
import { BankingTab } from './adapters/ui/components/banking/BankingTab';
import { PoolingTab } from './adapters/ui/components/pooling/PoolingTab';

function App() {
  const [activeTab, setActiveTab] = useState('Routes');

  const renderTab = () => {
    switch (activeTab) {
      case 'Routes': return <RoutesTab />;
      case 'Compare': return <CompareTab />;
      case 'Banking': return <BankingTab />;
      case 'Pooling': return <PoolingTab />;
      default: return <RoutesTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <Navbar />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderTab()}
      </main>
    </div>
  );
}

export default App;