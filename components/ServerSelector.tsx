
import React, { useState, useMemo } from 'react';
import { Server } from '../types';
import { BoltIcon } from './icons/BoltIcon';

interface ServerSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  servers: Server[];
  onSelect: (server: Server | null) => void;
  fastestServer: Server;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ isOpen, onClose, servers, onSelect, fastestServer }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServers = useMemo(() => 
    servers.filter(server =>
      server.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.city.toLowerCase().includes(searchTerm.toLowerCase())
    ), [servers, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-slate-300 dark:border-slate-700">
          <h2 className="text-lg font-bold text-center text-slate-900 dark:text-white">Select Server</h2>
          <input
            type="text"
            placeholder="Search country or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mt-3 p-2 rounded-md bg-slate-300 dark:bg-slate-700 placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="overflow-y-auto flex-grow">
          {/* Fastest Server Option */}
          <div
            onClick={() => onSelect(null)}
            className="flex items-center p-4 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="w-10 h-10 bg-cyan-500/20 rounded-md flex items-center justify-center mr-4">
               <BoltIcon className="w-6 h-6 text-cyan-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Fastest Server</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{fastestServer.country}, {fastestServer.city}</p>
            </div>
          </div>

          {/* Server List */}
          {filteredServers.map((server) => (
            <div
              key={`${server.country}-${server.city}`}
              onClick={() => onSelect(server)}
              className="flex items-center p-4 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700/50 transition-colors"
            >
              <img src={`https://flagcdn.com/w40/${server.countryCode.toLowerCase()}.png`} alt={server.country} className="w-10 h-auto rounded-md mr-4" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{server.country}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{server.city}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-slate-300 dark:border-slate-700">
            <button onClick={onClose} className="w-full py-2 text-center text-slate-600 dark:text-slate-300 font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                Cancel
            </button>
        </div>
      </div>
    </div>
  );
};

export default ServerSelector;
