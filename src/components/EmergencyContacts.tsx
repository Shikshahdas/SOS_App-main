import React, { useState } from 'react';
import { User, Plus, Phone } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  avatar: string;
}

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      relationship: 'Emergency Contact',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      id: '2',
      name: 'Dr. Mike Chen',
      relationship: 'Family Doctor',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.pexels.com/photos/612999/pexels-photo-612999.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      id: '3',
      name: 'Local Emergency',
      relationship: '911 Service',
      phone: '911',
      avatar: 'https://images.pexels.com/photos/163521/sheriff-police-officer-badge-patrol-163521.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    }
  ]);

  return (
    <section className="bg-black/30 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <h2 className="text-xl font-bold text-white/95 mb-4 text-center flex items-center justify-center gap-2">
        <User className="w-5 h-5 text-red-300" />
        Emergency Contacts
      </h2>
      
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {contacts.map((contact, index) => (
          <div 
            key={contact.id}
            className="flex items-center p-3 bg-white/95 rounded-xl hover:bg-white transition-all duration-300 
                     hover:scale-[1.02] group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img 
              src={contact.avatar} 
              alt={contact.name}
              className="w-12 h-12 rounded-full border-2 border-red-300 object-cover mr-3 
                       group-hover:border-red-400 transition-colors"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{contact.name}</p>
              <p className="text-sm text-red-700 font-medium">{contact.relationship}</p>
              <p className="text-xs text-gray-700">{contact.phone}</p>
            </div>
            <Phone className="w-5 h-5 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <button className="w-full mt-4 p-3 bg-gradient-to-r from-red-500 to-red-600 text-white 
                       rounded-xl font-semibold hover:from-red-600 hover:to-red-700 
                       transition-all duration-300 hover:scale-[1.02] active:scale-95 
                       focus:outline-none focus:ring-2 focus:ring-red-400/50 flex items-center justify-center gap-2
                       shadow-lg hover:shadow-xl">
        <Plus className="w-5 h-5" />
        Add Emergency Contact
      </button>
    </section>
  );
};

export default EmergencyContacts;