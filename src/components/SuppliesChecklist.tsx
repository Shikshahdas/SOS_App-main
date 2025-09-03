import React, { useState } from 'react';
import { ArrowLeft, Package, Check, X, Plus } from 'lucide-react';

interface SuppliesChecklistProps {
  onBack: () => void;
}

interface SupplyItem {
  id: string;
  name: string;
  category: string;
  quantity?: string;
  priority: 'critical' | 'important' | 'helpful';
  checked: boolean;
}

const SuppliesChecklist: React.FC<SuppliesChecklistProps> = ({ onBack }) => {
  const [supplies, setSupplies] = useState<SupplyItem[]>([
    // Critical items
    { id: '1', name: 'Water (1 gallon per person per day)', category: 'Water & Food', priority: 'critical', checked: true },
    { id: '2', name: 'Non-perishable food (3-day supply)', category: 'Water & Food', priority: 'critical', checked: false },
    { id: '3', name: 'Battery-powered radio', category: 'Communication', priority: 'critical', checked: true },
    { id: '4', name: 'Flashlight with extra batteries', category: 'Light & Power', priority: 'critical', checked: true },
    { id: '5', name: 'First aid kit', category: 'Medical', priority: 'critical', checked: false },
    
    // Important items
    { id: '6', name: 'Extra batteries', category: 'Light & Power', priority: 'important', checked: false },
    { id: '7', name: 'Whistle for signaling help', category: 'Communication', priority: 'important', checked: true },
    { id: '8', name: 'Dust masks', category: 'Medical', priority: 'important', checked: false },
    { id: '9', name: 'Plastic sheeting and duct tape', category: 'Shelter', priority: 'important', checked: false },
    { id: '10', name: 'Moist towelettes', category: 'Hygiene', priority: 'important', checked: false },
    
    // Helpful items
    { id: '11', name: 'Manual can opener', category: 'Tools', priority: 'helpful', checked: false },
    { id: '12', name: 'Local maps', category: 'Navigation', priority: 'helpful', checked: false },
    { id: '13', name: 'Cell phone charger', category: 'Communication', priority: 'helpful', checked: true },
    { id: '14', name: 'Cash and coins', category: 'Financial', priority: 'helpful', checked: false },
    { id: '15', name: 'Emergency blanket', category: 'Shelter', priority: 'helpful', checked: false }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(supplies.map(item => item.category)))];

  const toggleSupply = (id: string) => {
    setSupplies(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const filteredSupplies = selectedCategory === 'All' 
    ? supplies 
    : supplies.filter(item => item.category === selectedCategory);

  const getProgressByPriority = (priority: 'critical' | 'important' | 'helpful') => {
    const priorityItems = supplies.filter(item => item.priority === priority);
    const checkedItems = priorityItems.filter(item => item.checked);
    return priorityItems.length > 0 ? (checkedItems.length / priorityItems.length) * 100 : 0;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'important': return 'text-orange-400 bg-orange-500/20 border-orange-400/30';
      case 'helpful': return 'text-green-400 bg-green-500/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
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
        <h2 className="text-2xl font-bold text-white">Emergency Supplies</h2>
      </div>

      {/* Progress Overview */}
      <div className="space-y-3">
        {(['critical', 'important', 'helpful'] as const).map(priority => (
          <div key={priority} className={`p-3 rounded-xl border ${getPriorityColor(priority)}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold capitalize">{priority} Items</span>
              <span className="text-sm">
                {supplies.filter(s => s.priority === priority && s.checked).length}/
                {supplies.filter(s => s.priority === priority).length}
              </span>
            </div>
            <div className="w-full bg-gray-600/50 rounded-full h-2">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  priority === 'critical' ? 'bg-red-400' : 
                  priority === 'important' ? 'bg-orange-400' : 'bg-green-400'
                }`}
                style={{ width: `${getProgressByPriority(priority)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300
              ${selectedCategory === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Supplies List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredSupplies.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md rounded-xl 
                     hover:bg-white/20 transition-all duration-300 group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <button
              onClick={() => toggleSupply(item.id)}
              className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50
                ${item.checked 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-white/40 hover:border-white/60'
                }
              `}
            >
              {item.checked && <Check className="w-4 h-4 text-white" />}
            </button>

            <div className="flex-1 min-w-0">
              <p className={`font-medium transition-all duration-300 ${
                item.checked ? 'text-white/60 line-through' : 'text-white'
              }`}>
                {item.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`
                  px-2 py-1 rounded text-xs font-medium border
                  ${getPriorityColor(item.priority)}
                `}>
                  {item.priority}
                </span>
                <span className="text-white/60 text-xs">{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
        <h3 className="text-blue-300 font-semibold mb-2">📋 Preparation Tips</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• Check and rotate supplies every 6 months</li>
          <li>• Store supplies in waterproof containers</li>
          <li>• Keep copies of important documents</li>
          <li>• Include supplies for pets and special needs</li>
        </ul>
      </div>
    </div>
  );
};

export default SuppliesChecklist;