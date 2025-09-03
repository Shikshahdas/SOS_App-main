import React, { useState } from 'react';
import { ArrowLeft, Book, Droplets, Home, Flame, Shield } from 'lucide-react';

interface SurvivalManualProps {
  onBack: () => void;
}

const SurvivalManual: React.FC<SurvivalManualProps> = ({ onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const survivalTopics = [
    {
      id: 'shelter',
      title: 'Emergency Shelter',
      icon: Home,
      color: 'from-brown-500 to-orange-600',
      content: {
        priority: 'Find or build shelter within 3 hours in harsh conditions',
        steps: [
          'Look for natural shelters: caves, rock overhangs, dense trees',
          'Build lean-to: prop large branch against tree, cover with smaller branches',
          'Create insulation layer with leaves, grass, or pine needles',
          'Ensure shelter is large enough for you plus insulation',
          'Block wind and create heat reflection with materials',
          'Signal for help by making shelter visible from air'
        ],
        tips: [
          'Shelter protects from wind, rain, sun, and cold',
          'Location matters: avoid low areas that collect water',
          'Face opening away from prevailing wind',
          'Insulation is critical - cold ground steals body heat'
        ]
      }
    },
    {
      id: 'water',
      title: 'Water Procurement',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-600',
      content: {
        priority: 'Find water within 3 days maximum',
        steps: [
          'Look for natural sources: streams, springs, rain collection',
          'Dig for water in dry creek beds or low-lying areas',
          'Collect dew with cloth in early morning',
          'Purify all water: boil for 1 minute, use purification tablets, or filter',
          'Store clean water in multiple containers',
          'Ration wisely: 1 gallon per person per day minimum'
        ],
        tips: [
          'Clear, moving water is generally safer than stagnant',
          'Avoid water with algae, strong odor, or dead animals nearby',
          'Melted snow/ice requires 2x more fuel than liquid water',
          'Early morning dew can provide significant water'
        ]
      }
    },
    {
      id: 'fire',
      title: 'Fire Making',
      icon: Flame,
      color: 'from-red-500 to-orange-600',
      content: {
        priority: 'Essential for warmth, cooking, signaling, and morale',
        steps: [
          'Gather tinder: dry grass, paper, birch bark, steel wool',
          'Collect kindling: pencil-thick dry twigs and small branches',
          'Prepare fuel wood: various sizes from thumb to wrist thick',
          'Create fire lay: tinder nest, kindling teepee, fuel wood ready',
          'Ignite tinder with matches, lighter, or friction method',
          'Gradually feed larger materials as fire establishes'
        ],
        tips: [
          'Prepare all materials before lighting - fires die quickly',
          'Build fire in safe location away from overhanging branches',
          'Have water or dirt nearby to extinguish if needed',
          'Three fires in triangle shape signals distress'
        ]
      }
    },
    {
      id: 'signaling',
      title: 'Rescue Signaling',
      icon: Shield,
      color: 'from-purple-500 to-pink-600',
      content: {
        priority: 'Critical for rescue - be visible and audible',
        steps: [
          'Use mirror or shiny object to reflect sunlight toward aircraft',
          'Create large ground signals: rocks, logs, bright clothing',
          'Make three of anything: fires, rock piles, whistle blasts',
          'Use bright colors that contrast with environment',
          'Signal during daylight hours when visibility is best',
          'Conserve energy - signal when you hear/see potential rescuers'
        ],
        tips: [
          'International distress signal is three of anything',
          'Orange, red, and yellow are most visible colors',
          'Smoke during day, fire/light during night',
          'Stay near your signal area once established'
        ]
      }
    }
  ];

  if (selectedTopic) {
    const topic = survivalTopics.find(t => t.id === selectedTopic);
    if (!topic) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedTopic(null)}
            className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-xl font-bold text-white">{topic.title}</h2>
        </div>

        <div className={`p-4 rounded-xl bg-gradient-to-r ${topic.color}/20 border border-current/30`}>
          <div className="flex items-center gap-2 mb-2">
            <topic.icon className="w-6 h-6 text-white" />
            <span className="text-white font-bold">Priority</span>
          </div>
          <p className="text-white/90 font-medium">{topic.content.priority}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-bold">Step-by-Step Guide</h3>
          <div className="space-y-3">
            {topic.content.steps.map((step, index) => (
              <div key={index} className="flex gap-3 p-3 bg-white/10 rounded-xl">
                <div className="flex-shrink-0 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-white/90 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
          <h4 className="text-yellow-300 font-semibold mb-2">💡 Pro Tips</h4>
          <ul className="space-y-1">
            {topic.content.tips.map((tip, index) => (
              <li key={index} className="text-white/80 text-sm">• {tip}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-bold text-white">Survival Manual</h2>
      </div>

      <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
        <h3 className="text-red-300 font-bold mb-2">🆘 Survival Priority Order</h3>
        <ol className="text-white/90 text-sm space-y-1">
          <li>1. <strong>Shelter</strong> - Protection from elements (3 hours)</li>
          <li>2. <strong>Signaling</strong> - Increase rescue chances</li>
          <li>3. <strong>Water</strong> - Essential for survival (3 days)</li>
          <li>4. <strong>Fire</strong> - Warmth, cooking, signaling</li>
          <li>5. <strong>Food</strong> - Energy and morale (3 weeks)</li>
        </ol>
      </div>

      <div className="space-y-3">
        {survivalTopics.map((topic, index) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic.id)}
            className="w-full p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 
                     hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 
                     focus:outline-none focus:ring-2 focus:ring-white/50 text-left group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} 
                            flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <topic.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{topic.title}</p>
                <p className="text-white/70 text-sm">Essential survival knowledge</p>
              </div>
              <ArrowLeft className="w-5 h-5 text-white/60 rotate-180 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
        <h3 className="text-green-300 font-semibold mb-2">🎯 Remember: S.T.O.P.</h3>
        <div className="space-y-2 text-sm">
          <p className="text-white/90"><strong>S</strong>it down and stay calm</p>
          <p className="text-white/90"><strong>T</strong>hink about your situation</p>
          <p className="text-white/90"><strong>O</strong>bserve your surroundings</p>
          <p className="text-white/90"><strong>P</strong>lan your next actions</p>
        </div>
      </div>
    </div>
  );
};

export default SurvivalManual;