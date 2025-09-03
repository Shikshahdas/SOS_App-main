import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="p-3 bg-red-500/20 rounded-2xl border border-red-400/30">
          <Shield className="w-12 h-12 text-red-300 drop-shadow-lg" />
        </div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-red-300 via-red-400 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
          OneTap SOS
        </h1>
      </div>
      <p className="text-white/90 text-sm font-medium tracking-wide bg-black/30 rounded-lg px-4 py-2 border border-white/10">
        Complete Emergency Survival Toolkit
      </p>
      <p className="text-white/70 text-xs mt-2 bg-black/20 rounded px-3 py-1">
        Professional-grade emergency response system
      </p>
    </header>
  );
};

export default Header;