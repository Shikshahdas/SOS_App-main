import React, { useState, useEffect } from 'react';
import { ArrowLeft, Compass, MapPin, Navigation, Satellite } from 'lucide-react';

interface NavigationToolsProps {
  onBack: () => void;
}

const NavigationTools: React.FC<NavigationToolsProps> = ({ onBack }) => {
  const [heading, setHeading] = useState(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setAltitude(position.coords.altitude || 0);
          setSpeed(position.coords.speed || 0);
          setAccuracy(position.coords.accuracy || 0);
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        { enableHighAccuracy: true }
      );
    }

    // Simulate compass heading (in real app, would use device orientation)
    const interval = setInterval(() => {
      setHeading(prev => (prev + 1) % 360);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getDirectionName = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-bold text-white">Navigation Tools</h2>
      </div>

      {/* Digital Compass */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <h3 className="text-white font-semibold mb-4 text-center">Digital Compass</h3>
        
        <div className="relative w-48 h-48 mx-auto mb-4">
          {/* Compass Face */}
          <div className="absolute inset-0 rounded-full border-4 border-white/30 bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Compass markings */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-6 bg-white/60 origin-bottom"
                style={{
                  left: '50%',
                  bottom: '50%',
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  transformOrigin: '50% 96px'
                }}
              />
            ))}
            
            {/* Direction labels */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-red-400 font-bold">N</div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold">S</div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white font-bold">E</div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white font-bold">W</div>
            
            {/* Compass needle */}
            <div
              className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-white to-red-500 
                       origin-bottom transform transition-transform duration-1000"
              style={{
                transform: `translateX(-50%) translateY(-100%) rotate(${heading}deg)`
              }}
            />
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-white">
            {heading.toFixed(0)}° {getDirectionName(heading)}
          </p>
          <p className="text-white/80 text-sm">Magnetic Heading</p>
        </div>
      </div>

      {/* GPS Information */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Satellite className="w-5 h-5 text-blue-400" />
          GPS Information
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Latitude:</span>
              <span className="text-white font-mono text-sm">
                {location ? location.lat.toFixed(6) : 'Getting location...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Longitude:</span>
              <span className="text-white font-mono text-sm">
                {location ? location.lng.toFixed(6) : 'Getting location...'}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Altitude:</span>
              <span className="text-white font-mono text-sm">{altitude.toFixed(0)} ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Accuracy:</span>
              <span className="text-white font-mono text-sm">±{accuracy.toFixed(0)} m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-md 
                         rounded-xl border border-blue-400/30 hover:from-blue-500/30 hover:to-indigo-600/30 
                         transition-all duration-300 group">
          <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-white font-semibold text-sm">Mark Location</p>
          <p className="text-white/70 text-xs">Save current position</p>
        </button>

        <button className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-md 
                         rounded-xl border border-green-400/30 hover:from-green-500/30 hover:to-emerald-600/30 
                         transition-all duration-300 group">
          <Navigation className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-white font-semibold text-sm">Share Location</p>
          <p className="text-white/70 text-xs">Send coordinates</p>
        </button>
      </div>

      {/* Navigation Tips */}
      <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-4">
        <h3 className="text-purple-300 font-semibold mb-2">🧭 Navigation Tips</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• Use compass with map for accurate navigation</li>
          <li>• Mark your starting point before venturing out</li>
          <li>• Follow streams downstream to find civilization</li>
          <li>• Three of anything is a universal distress signal</li>
          <li>• Stay put if lost - rescue teams can find you easier</li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationTools;