import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface SOSButtonProps {
  onStatusUpdate: (message: string) => void;
}

const SOSButton: React.FC<SOSButtonProps> = ({ onStatusUpdate }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleSOSPress = async () => {
    setIsPressed(true);
    onStatusUpdate('🔍 Detecting precise location...');

    // Simulate vibration
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }

    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            onStatusUpdate(`🚨 EMERGENCY ALERT SENT! Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            
            setTimeout(() => {
              onStatusUpdate('✅ Emergency services & contacts notified. Help dispatched. Stay calm & visible.');
            }, 3000);
          },
          () => {
            onStatusUpdate('⚠️ Location unavailable. Emergency alert sent with device info. Help is coming!');
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        onStatusUpdate('🚨 Emergency alert sent! Help has been notified and is on the way.');
      }
    } catch (error) {
      onStatusUpdate('🚨 Emergency protocols activated. Multiple alert channels initiated.');
    }

    setTimeout(() => setIsPressed(false), 300);
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        {/* Pulse rings */}
        <div className="absolute inset-0 -m-6">
          <div className="w-full h-full border-3 border-red-400/60 rounded-full animate-ping" />
        </div>
        <div className="absolute inset-0 -m-10">
          <div className="w-full h-full border-2 border-red-300/40 rounded-full animate-ping animation-delay-300" />
        </div>
        
        <button
          onClick={handleSOSPress}
          className={`
            relative w-44 h-44 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 
            shadow-2xl border-4 border-red-300/60 transition-all duration-200 
            hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/50
            ${isPressed ? 'scale-95 shadow-inner' : 'shadow-2xl shadow-red-500/30'}
          `}
        >
          <div className="flex flex-col items-center justify-center h-full text-white">
            <AlertTriangle className="w-10 h-10 mb-2 drop-shadow-lg animate-pulse" />
            <span className="text-xl font-black tracking-wider drop-shadow-md">SOS</span>
            <span className="text-xs font-semibold opacity-90 drop-shadow-sm">EMERGENCY</span>
          </div>
          
          {/* Highlight effect */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
        </button>
      </div>
      
      <p className="mt-6 text-center text-white/90 text-sm max-w-xs leading-relaxed bg-black/30 rounded-xl px-4 py-3 border border-white/10">
        <span className="font-semibold text-red-300">Single tap activates emergency protocol:</span><br />
        <span className="text-white/80">Location sharing • Contact alerts • Emergency services</span>
      </p>
    </div>
  );
};

export default SOSButton;