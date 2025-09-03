import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SOSButton from './components/SOSButton';
import StatusDisplay from './components/StatusDisplay';
import FeatureGrid from './components/FeatureGrid';
import EmergencyContacts from './components/EmergencyContacts';
import SurvivalManual from './components/SurvivalManual';
import Flashlight from './components/Flashlight';
import EmergencyRadio from './components/EmergencyRadio';
import FirstAidGuide from './components/FirstAidGuide';
import WeatherMonitor from './components/WeatherMonitor';
import SuppliesChecklist from './components/SuppliesChecklist';
import NavigationTools from './components/NavigationTools';

export type AppView = 'main' | 'survival' | 'flashlight' | 'radio' | 'firstaid' | 'weather' | 'supplies' | 'navigation';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('main');
  const [status, setStatus] = useState('');
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [batterySaver, setBatterySaver] = useState(false);

  useEffect(() => {
    // Simulate battery monitoring
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        const drain = batterySaver ? 0.1 : 0.2;
        return Math.max(10, prev - drain);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [batterySaver]);

  const showStatus = (message: string) => {
    setStatus(message);
    setIsStatusVisible(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'survival':
        return <SurvivalManual onBack={() => setCurrentView('main')} />;
      case 'flashlight':
        return <Flashlight onBack={() => setCurrentView('main')} />;
      case 'radio':
        return <EmergencyRadio onBack={() => setCurrentView('main')} />;
      case 'firstaid':
        return <FirstAidGuide onBack={() => setCurrentView('main')} />;
      case 'weather':
        return <WeatherMonitor onBack={() => setCurrentView('main')} />;
      case 'supplies':
        return <SuppliesChecklist onBack={() => setCurrentView('main')} />;
      case 'navigation':
        return <NavigationTools onBack={() => setCurrentView('main')} />;
      default:
        return (
          <>
            <SOSButton onStatusUpdate={showStatus} />
            <StatusDisplay status={status} isVisible={isStatusVisible} />
            <FeatureGrid 
              onViewChange={setCurrentView}
              batteryLevel={batteryLevel}
              batterySaver={batterySaver}
              onBatterySaverToggle={setBatterySaver}
            />
            <EmergencyContacts />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-red-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-orange-500/10 pointer-events-none" />
        
        <div className="relative z-10">
          <Header />
          {renderCurrentView()}
          
          {currentView === 'main' && (
            <footer className="mt-8 text-center text-xs text-white/60">
              <p className="bg-black/30 rounded-lg px-3 py-2 border border-white/10">
                © 2025 OneTap SOS. Emergency toolkit for life-critical situations.
              </p>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;