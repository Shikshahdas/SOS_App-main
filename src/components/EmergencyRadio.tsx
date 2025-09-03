import React, { useState, useEffect } from 'react';
import { ArrowLeft, Radio, Volume2, VolumeX, Wifi, WifiOff } from 'lucide-react';

interface EmergencyRadioProps {
  onBack: () => void;
}

const EmergencyRadio: React.FC<EmergencyRadioProps> = ({ onBack }) => {
  const [isOn, setIsOn] = useState(false);
  const [volume, setVolume] = useState(50);
  const [frequency, setFrequency] = useState(162.550);
  const [isScanning, setIsScanning] = useState(false);
  const [signalStrength, setSignalStrength] = useState(3);
  
  const emergencyChannels = [
    { freq: 162.400, name: 'NOAA Weather 1', type: 'Weather Alert' },
    { freq: 162.425, name: 'NOAA Weather 2', type: 'Weather Alert' },
    { freq: 162.450, name: 'NOAA Weather 3', type: 'Weather Alert' },
    { freq: 162.475, name: 'NOAA Weather 4', type: 'Weather Alert' },
    { freq: 162.500, name: 'NOAA Weather 5', type: 'Weather Alert' },
    { freq: 162.525, name: 'NOAA Weather 6', type: 'Weather Alert' },
    { freq: 162.550, name: 'NOAA Weather 7', type: 'Weather Alert' },
    { freq: 121.500, name: 'Aviation Emergency', type: 'Emergency' },
    { freq: 156.800, name: 'Marine Emergency', type: 'Emergency' }
  ];

  const currentChannel = emergencyChannels.find(ch => ch.freq === frequency);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        const nextIndex = (emergencyChannels.findIndex(ch => ch.freq === frequency) + 1) % emergencyChannels.length;
        setFrequency(emergencyChannels[nextIndex].freq);
        setSignalStrength(Math.floor(Math.random() * 5) + 1);
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isScanning, frequency]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 bg-black/30 rounded-xl hover:bg-black/40 transition-colors border border-white/20"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-bold text-white/95">Emergency Radio</h2>
      </div>

      {/* Radio Display */}
      <div className="bg-black/50 backdrop-blur-md rounded-xl border border-white/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isOn ? (
              <Wifi className="w-5 h-5 text-green-300" />
            ) : (
              <WifiOff className="w-5 h-5 text-gray-300" />
            )}
            <span className="text-white/95 font-semibold">
              {isOn ? 'RECEIVING' : 'OFFLINE'}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-5 rounded ${
                  i < signalStrength ? 'bg-green-300' : 'bg-gray-600/60'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-3xl font-mono font-bold text-yellow-300 mb-1 drop-shadow-sm">
            {frequency.toFixed(3)} MHz
          </div>
          {currentChannel && (
            <div className="text-white/90">
              <p className="font-semibold">{currentChannel.name}</p>
              <p className="text-xs text-blue-200">{currentChannel.type}</p>
            </div>
          )}
        </div>

        {isOn && (
          <div className="bg-green-500/30 border border-green-400/40 rounded-lg p-3 mb-4">
            <p className="text-green-200 text-sm font-semibold">📡 LIVE BROADCAST</p>
            <p className="text-white/95 text-xs mt-1">
              "...National Weather Service has issued a severe weather warning for your area. 
              Seek immediate shelter and monitor emergency channels for updates..."
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setIsOn(!isOn)}
            className={`
              flex-1 p-4 rounded-xl font-bold text-white transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-blue-400/50 active:scale-95
              ${isOn 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600 hover:scale-105'
              }
            `}
          >
            <Radio className="w-6 h-6 mx-auto mb-1" />
            {isOn ? 'TURN OFF' : 'TURN ON'}
          </button>

          <button
            onClick={() => {
              setIsScanning(!isScanning);
              if (!isOn) setIsOn(true);
            }}
            className={`
              flex-1 p-4 rounded-xl font-bold text-white transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 active:scale-95
              ${isScanning 
                ? 'bg-purple-500 hover:bg-purple-600' 
                : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
              }
            `}
          >
            <Wifi className={`w-6 h-6 mx-auto mb-1 ${isScanning ? 'animate-pulse' : ''}`} />
            {isScanning ? 'SCANNING...' : 'AUTO SCAN'}
          </button>
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Volume: {volume}%
          </label>
          <div className="flex items-center gap-3">
            <VolumeX className="w-5 h-5 text-white/60" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-600/50 rounded-lg appearance-none cursor-pointer"
            />
            <Volume2 className="w-5 h-5 text-white/60" />
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Frequency Tuner
          </label>
          <input
            type="range"
            min="88.1"
            max="162.6"
            step="0.1"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full h-3 bg-gray-600/50 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Emergency Channels Quick Access */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
        <h3 className="text-white font-semibold mb-3">Quick Access Channels</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {emergencyChannels.map((channel) => (
            <button
              key={channel.freq}
              onClick={() => {
                setFrequency(channel.freq);
                if (!isOn) setIsOn(true);
              }}
              className={`
                w-full p-3 rounded-lg text-left transition-all duration-300 
                hover:scale-[1.02] active:scale-95
                ${frequency === channel.freq 
                  ? 'bg-blue-500/30 border-blue-400' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
                } border
              `}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium text-sm">{channel.name}</p>
                  <p className="text-blue-300 text-xs">{channel.type}</p>
                </div>
                <span className="text-yellow-400 font-mono text-sm">
                  {channel.freq.toFixed(3)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-orange-500/20 border border-orange-400/30 rounded-xl p-4">
        <h3 className="text-orange-300 font-semibold mb-2">Emergency Radio Tips</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• Monitor NOAA weather channels for severe weather alerts</li>
          <li>• 121.5 MHz is the international aviation emergency frequency</li>
          <li>• Keep radio on during severe weather events</li>
          <li>• Conserve battery by adjusting volume and brightness</li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyRadio;