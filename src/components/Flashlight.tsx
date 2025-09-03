import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flashlight as FlashlightIcon, Zap, Square } from 'lucide-react';

interface FlashlightProps {
  onBack: () => void;
}

const Flashlight: React.FC<FlashlightProps> = ({ onBack }) => {
  const [isOn, setIsOn] = useState(false);
  const [mode, setMode] = useState<'steady' | 'strobe' | 'sos'>('steady');
  const [brightness, setBrightness] = useState(100);

  useEffect(() => {
    if (isOn && mode === 'strobe') {
      const interval = setInterval(() => {
        document.body.style.backgroundColor = document.body.style.backgroundColor === 'white' ? 'black' : 'white';
      }, 200);
      return () => clearInterval(interval);
    } else if (isOn && mode === 'sos') {
      // SOS pattern: ... --- ...
      const pattern = [200, 200, 200, 200, 200, 600, 600, 600, 600, 600, 200, 200, 200, 200, 200];
      let index = 0;
      const interval = setInterval(() => {
        document.body.style.backgroundColor = index % 2 === 0 ? 'white' : 'black';
        index = (index + 1) % pattern.length;
      }, pattern[index] || 200);
      return () => clearInterval(interval);
    } else {
      document.body.style.backgroundColor = isOn ? 'white' : '';
    }
  }, [isOn, mode]);

  const toggleFlashlight = () => {
    setIsOn(!isOn);
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 bg-black/30 rounded-xl hover:bg-black/40 transition-colors border border-white/20"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-bold text-white/95">Emergency Flashlight</h2>
      </div>

      <div className="text-center space-y-6">
        <div className={`
          w-56 h-56 mx-auto rounded-full flex items-center justify-center 
          transition-all duration-300 border-4 relative
          ${isOn 
            ? 'bg-yellow-300/90 border-yellow-400 shadow-2xl shadow-yellow-400/60' 
            : 'bg-gray-800/60 border-gray-600/50'
          }
        `}>
          {isOn && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200/90 to-yellow-400/90 animate-pulse" />
          )}
          <FlashlightIcon 
            className={`w-20 h-20 transition-colors duration-300 relative z-10 drop-shadow-lg ${
              isOn ? 'text-yellow-800' : 'text-gray-300'
            }`} 
          />
        </div>

        <button
          onClick={toggleFlashlight}
          className={`
            w-28 h-28 rounded-full font-black text-lg transition-all duration-300 
            focus:outline-none focus:ring-4 focus:ring-yellow-400/50 active:scale-95
            ${isOn 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-500/30' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/30 hover:scale-105'
            }
          `}
        >
          {isOn ? 'OFF' : 'ON'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white/90 text-sm font-medium mb-2">
            Light Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'steady', label: 'Steady', icon: Square },
              { key: 'strobe', label: 'Strobe', icon: Zap },
              { key: 'sos', label: 'SOS', icon: FlashlightIcon }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setMode(key as typeof mode)}
                className={`
                  p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 border
                  ${mode === key 
                    ? 'bg-yellow-500/40 border-yellow-400/60 text-yellow-200' 
                    : 'bg-black/30 border-white/20 text-white/80 hover:bg-black/40'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white/90 text-sm font-medium mb-2">
            Brightness: {brightness}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-3 bg-gray-800/60 rounded-lg appearance-none cursor-pointer border border-gray-600/30
                     slider-thumb:appearance-none slider-thumb:w-4 slider-thumb:h-4 
                     slider-thumb:rounded-full slider-thumb:bg-yellow-400 slider-thumb:cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/20 p-4">
        <h3 className="text-white/95 font-semibold mb-2">Emergency Light Tips</h3>
        <ul className="text-white/85 text-sm space-y-1">
          <li>• Use SOS mode for rescue signals (3 short, 3 long, 3 short)</li>
          <li>• Strobe mode is visible from greater distances</li>
          <li>• Lower brightness to conserve battery power</li>
          <li>• Flash towards sky or reflective surfaces for better visibility</li>
        </ul>
      </div>
    </div>
  );
};

export default Flashlight;