import React from 'react';
import { 
  Flashlight, Radio, Heart, Cloud, Package, Compass, 
  Zap, MapPin, Volume2, Thermometer
} from 'lucide-react';
import { AppView } from '../App';

interface FeatureGridProps {
  onViewChange: (view: AppView) => void;
  batteryLevel: number;
  batterySaver: boolean;
  onBatterySaverToggle: (enabled: boolean) => void;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ 
  onViewChange, 
  batteryLevel, 
  batterySaver, 
  onBatterySaverToggle 
}) => {
  const features = [
    {
      icon: Flashlight,
      label: 'Flashlight',
      view: 'flashlight' as AppView,
      color: 'from-yellow-400 to-orange-500',
      description: 'High-intensity LED with SOS patterns'
    },
    {
      icon: Radio,
      label: 'Emergency Radio',
      view: 'radio' as AppView,
      color: 'from-blue-400 to-indigo-500',
      description: 'Weather alerts & emergency broadcasts'
    },
    {
      icon: Heart,
      label: 'First Aid',
      view: 'firstaid' as AppView,
      color: 'from-red-400 to-pink-500',
      description: 'Medical emergency protocols'
    },
    {
      icon: Cloud,
      label: 'Weather Monitor',
      view: 'weather' as AppView,
      color: 'from-cyan-400 to-blue-500',
      description: 'Real-time weather & alerts'
    },
    {
      icon: Package,
      label: 'Supply Kit',
      view: 'supplies' as AppView,
      color: 'from-green-400 to-emerald-500',
      description: 'Emergency supplies checklist'
    },
    {
      icon: Compass,
      label: 'Navigation',
      view: 'navigation' as AppView,
      color: 'from-purple-400 to-violet-500',
      description: 'Compass & offline maps'
    }
  ];

  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'from-green-400 to-emerald-500';
    if (batteryLevel > 20) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {features.map((feature, index) => (
          <button
            key={feature.label}
            onClick={() => onViewChange(feature.view)}
            className="group relative p-4 bg-black/30 backdrop-blur-md rounded-xl border border-white/20 
                     hover:bg-black/40 hover:scale-105 active:scale-95 transition-all duration-300 
                     focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-2 mx-auto 
                           group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <feature.icon className="w-5 h-5 text-white drop-shadow-sm" />
            </div>
            <p className="text-white/90 text-xs font-semibold text-center leading-tight">
              {feature.label}
            </p>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        ))}
      </div>

      {/* Battery and System Status */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-black/30 backdrop-blur-md rounded-xl border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-semibold">Battery</span>
          </div>
          <div className="w-full bg-gray-800/60 rounded-full h-3 overflow-hidden border border-gray-600/30">
            <div 
              className={`h-full bg-gradient-to-r ${getBatteryColor()} rounded-full transition-all duration-1000`}
              style={{ width: `${batteryLevel}%` }}
            />
          </div>
          <p className="text-white/90 text-xs mt-1 font-medium">{batteryLevel.toFixed(0)}% remaining</p>
        </div>

        <div className="p-4 bg-black/30 backdrop-blur-md rounded-xl border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-400" />
              <span className="text-white/90 text-sm font-semibold">Power Save</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={batterySaver}
                onChange={(e) => onBatterySaverToggle(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-800/60 peer-focus:outline-none rounded-full peer border border-gray-600/30
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-green-500"></div>
            </label>
          </div>
          <p className="text-white/90 text-xs font-medium">
            {batterySaver ? 'Active' : 'Disabled'}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => onViewChange('survival')}
          className="p-4 bg-gradient-to-br from-emerald-500/30 to-green-600/30 backdrop-blur-md 
                   rounded-xl border border-emerald-400/40 hover:from-emerald-500/40 hover:to-green-600/40 
                   transition-all duration-300 group"
        >
          <MapPin className="w-7 h-7 text-emerald-300 mx-auto mb-2 group-hover:scale-110 transition-transform drop-shadow-sm" />
          <p className="text-white/95 font-semibold text-sm">Survival Guide</p>
          <p className="text-white/80 text-xs">Complete manual</p>
        </button>

        <button
          onClick={() => onViewChange('flashlight')}
          className="p-4 bg-gradient-to-br from-yellow-500/30 to-orange-600/30 backdrop-blur-md 
                   rounded-xl border border-yellow-400/40 hover:from-yellow-500/40 hover:to-orange-600/40 
                   transition-all duration-300 group"
        >
          <Flashlight className="w-7 h-7 text-yellow-300 mx-auto mb-2 group-hover:scale-110 transition-transform drop-shadow-sm" />
          <p className="text-white/95 font-semibold text-sm">Emergency Light</p>
          <p className="text-white/80 text-xs">SOS patterns</p>
        </button>
      </div>
    </>
  );
};

export default FeatureGrid;