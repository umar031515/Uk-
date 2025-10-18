
import React from 'react';
import { ConnectionStatus } from '../types';
import { PowerIcon } from './icons/PowerIcon';

interface ConnectionDisplayProps {
  status: ConnectionStatus;
  onToggleConnect: () => void;
}

const ConnectionDisplay: React.FC<ConnectionDisplayProps> = ({ status, onToggleConnect }) => {
  const isConnecting = status === ConnectionStatus.Connecting;
  const isConnected = status === ConnectionStatus.Connected;
  const isDisconnecting = status === ConnectionStatus.Disconnecting;
  const isOff = status === ConnectionStatus.Disconnected;

  const getStatusText = () => {
    switch (status) {
      case ConnectionStatus.Connected:
        return 'Connected';
      case ConnectionStatus.Connecting:
        return 'Connecting...';
      case ConnectionStatus.Disconnecting:
        return 'Disconnecting...';
      case ConnectionStatus.Disconnected:
      default:
        return 'Not Connected';
    }
  };

  const buttonBgClass = isConnected
    ? 'bg-gradient-to-br from-cyan-400 to-emerald-500'
    : 'bg-gradient-to-br from-slate-500 to-slate-600 dark:from-slate-600 dark:to-slate-700';
  
  const buttonShadowClass = isConnected 
    ? 'shadow-[0_0_20px_theme(colors.cyan.400)]' 
    : (isConnecting ? 'shadow-[0_0_20px_theme(colors.slate.500)] animate-pulse' : 'shadow-lg');

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={onToggleConnect}
        className={`relative w-40 h-40 rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out transform hover:scale-105 ${buttonBgClass} ${buttonShadowClass}`}
      >
        <PowerIcon className="w-16 h-16" />
      </button>
      <p className={`font-semibold text-lg transition-colors duration-300 ${isConnected ? 'text-cyan-500 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400'}`}>
        {getStatusText()}
      </p>
    </div>
  );
};

export default ConnectionDisplay;
