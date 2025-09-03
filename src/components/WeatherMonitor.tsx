import React, { useState, useEffect } from 'react';
import { ArrowLeft, Cloud, Sun, CloudRain, Wind, Thermometer, Eye } from 'lucide-react';

interface WeatherMonitorProps {
  onBack: () => void;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  condition: string;
  alert?: string;
}

const WeatherMonitor: React.FC<WeatherMonitorProps> = ({ onBack }) => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 72,
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    pressure: 30.15,
    condition: 'partly-cloudy'
  });
  const [hasAlert, setHasAlert] = useState(false);

  useEffect(() => {
    // Simulate weather updates
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 10)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 4),
        pressure: prev.pressure + (Math.random() - 0.5) * 0.1
      }));
    }, 5000);

    // Simulate weather alerts
    const alertInterval = setInterval(() => {
      setHasAlert(Math.random() < 0.3);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearInterval(alertInterval);
    };
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return Sun;
      case 'rainy': return CloudRain;
      case 'windy': return Wind;
      default: return Cloud;
    }
  };

  const WeatherIcon = getWeatherIcon();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 bg-black/30 rounded-xl hover:bg-black/40 transition-colors border border-white/20"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-bold text-white/95">Weather Monitor</h2>
      </div>

      {hasAlert && (
        <div className="bg-red-500/30 border border-red-400/60 rounded-xl p-4 animate-pulse">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-300" />
            <span className="text-red-200 font-bold">SEVERE WEATHER ALERT</span>
          </div>
          <p className="text-white/95 text-sm">
            Severe thunderstorm warning in effect. Seek immediate shelter. 
            Avoid outdoor activities until conditions improve.
          </p>
        </div>
      )}

      <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/30 p-6">
        <div className="text-center mb-6">
          <WeatherIcon className="w-14 h-14 text-blue-300 mx-auto mb-2 drop-shadow-sm" />
          <div className="text-4xl font-bold text-white/95 mb-1 drop-shadow-sm">
            {weather.temperature.toFixed(0)}°F
          </div>
          <p className="text-white/90 capitalize font-medium">{weather.condition.replace('-', ' ')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-black/30 rounded-xl border border-white/10">
            <Wind className="w-5 h-5 text-cyan-300 mx-auto mb-1" />
            <p className="text-white/70 text-xs">Wind Speed</p>
            <p className="text-white/95 font-semibold">{weather.windSpeed.toFixed(0)} mph</p>
          </div>

          <div className="text-center p-3 bg-black/30 rounded-xl border border-white/10">
            <Thermometer className="w-5 h-5 text-red-300 mx-auto mb-1" />
            <p className="text-white/70 text-xs">Humidity</p>
            <p className="text-white/95 font-semibold">{weather.humidity.toFixed(0)}%</p>
          </div>

          <div className="text-center p-3 bg-black/30 rounded-xl border border-white/10">
            <Eye className="w-5 h-5 text-gray-300 mx-auto mb-1" />
            <p className="text-white/70 text-xs">Visibility</p>
            <p className="text-white/95 font-semibold">{weather.visibility} mi</p>
          </div>

          <div className="text-center p-3 bg-black/30 rounded-xl border border-white/10">
            <Cloud className="w-5 h-5 text-blue-300 mx-auto mb-1" />
            <p className="text-white/70 text-xs">Pressure</p>
            <p className="text-white/95 font-semibold">{weather.pressure.toFixed(2)} in</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-white/95 font-semibold">Weather-Based Safety Recommendations</h3>
        
        <div className="space-y-2">
          {weather.windSpeed > 15 && (
            <div className="p-3 bg-yellow-500/30 border border-yellow-400/40 rounded-xl">
              <p className="text-yellow-200 font-medium text-sm">
                ⚠️ High winds detected. Secure loose objects and avoid open areas.
              </p>
            </div>
          )}
          
          {weather.temperature < 40 && (
            <div className="p-3 bg-blue-500/30 border border-blue-400/40 rounded-xl">
              <p className="text-blue-200 font-medium text-sm">
                🥶 Cold temperature alert. Prevent hypothermia - stay dry and warm.
              </p>
            </div>
          )}
          
          {weather.temperature > 90 && (
            <div className="p-3 bg-red-500/30 border border-red-400/40 rounded-xl">
              <p className="text-red-200 font-medium text-sm">
                🌡️ High temperature alert. Stay hydrated and seek shade regularly.
              </p>
            </div>
          )}
          
          {weather.visibility < 5 && (
            <div className="p-3 bg-gray-500/30 border border-gray-400/40 rounded-xl">
              <p className="text-gray-200 font-medium text-sm">
                🌫️ Low visibility conditions. Use lights and move slowly.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/20 p-4">
        <h3 className="text-white/95 font-semibold mb-2">24-Hour Forecast</h3>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center p-2 bg-black/20 rounded-lg border border-white/10">
              <p className="text-white/70 text-xs">{i * 6}:00</p>
              <Cloud className="w-4 h-4 text-blue-300 mx-auto my-1" />
              <p className="text-white/95 text-sm font-semibold">
                {(weather.temperature - i * 2).toFixed(0)}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherMonitor;