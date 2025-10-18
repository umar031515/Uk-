
import React from 'react';
import { Protocol } from '../types';
import { LockIcon } from './icons/LockIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  protocol: Protocol;
  setProtocol: (protocol: Protocol) => void;
  killSwitch: boolean;
  setKillSwitch: (enabled: boolean) => void;
  splitTunneling: boolean;
  setSplitTunneling: (enabled: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  protocol,
  setProtocol,
  killSwitch,
  setKillSwitch,
  splitTunneling,
  setSplitTunneling,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl w-full max-w-md flex flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-slate-300 dark:border-slate-700">
          <h2 className="text-lg font-bold text-center text-slate-900 dark:text-white">Settings</h2>
        </div>
        <div className="p-6 space-y-6">
          {/* Protocol Selection */}
          <div>
            <label htmlFor="protocol" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Protocol</label>
            <select
              id="protocol"
              value={protocol}
              onChange={(e) => setProtocol(e.target.value as Protocol)}
              className="w-full p-2 rounded-md bg-slate-300 dark:bg-slate-700 outline-none focus:ring-2 focus:ring-cyan-500 border-transparent"
            >
              <option>WireGuard</option>
              <option>OpenVPN</option>
              <option>IKEv2</option>
            </select>
          </div>
          
          {/* Kill Switch */}
          <div className="flex justify-between items-center">
             <div>
                <p className="font-medium text-slate-900 dark:text-white">Kill Switch</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Block internet if VPN disconnects</p>
            </div>
            <button onClick={() => setKillSwitch(!killSwitch)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${killSwitch ? 'bg-cyan-500' : 'bg-slate-400 dark:bg-slate-600'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${killSwitch ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Split Tunneling */}
          <div className="flex justify-between items-center">
            <div>
                <p className="font-medium text-slate-900 dark:text-white">Split Tunneling</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Choose apps to use VPN</p>
            </div>
            <button onClick={() => setSplitTunneling(!splitTunneling)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${splitTunneling ? 'bg-cyan-500' : 'bg-slate-400 dark:bg-slate-600'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${splitTunneling ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          
           <div className="flex items-center p-3 bg-slate-300/50 dark:bg-slate-700/50 rounded-lg">
                <LockIcon className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                <p className="text-sm text-slate-700 dark:text-slate-300">Your connection is secured with AES-256 encryption. We have a strict no-log policy.</p>
           </div>
        </div>
        <div className="p-2 border-t border-slate-300 dark:border-slate-700">
            <button onClick={onClose} className="w-full py-2 text-center text-slate-600 dark:text-slate-300 font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
