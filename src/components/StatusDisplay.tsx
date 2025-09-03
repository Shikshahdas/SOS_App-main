import React from 'react';

interface StatusDisplayProps {
  status: string;
  isVisible: boolean;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, isVisible }) => {
  if (!isVisible || !status) return null;

  return (
    <div className={`
      mb-6 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/30 
      transition-all duration-500 transform
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      <p className="text-white/95 text-center font-medium leading-relaxed">
        {status}
      </p>
    </div>
  );
};

export default StatusDisplay;