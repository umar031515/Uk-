
import React from 'react';
import { ConnectionStatus } from '../types';

interface StatsDisplayProps {
  status: ConnectionStatus;
  ping: number | null;
  dataUsage: { download: number; upload: number };
  connectionTime: number;
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const StatsDisplay: React.FC<StatsDisplayProps> = ({ status, ping, dataUsage, connectionTime }) => {
  const isConnected = status === ConnectionStatus.Connected;

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Ping</p>
        <p className="font-semibold text-lg text-slate-900 dark:text-white">{isConnected && ping ? `${ping} ms` : '-'}</p>
      </div>
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Download</p>
        <p className="font-semibold text-lg text-slate-900 dark:text-white">{formatBytes(dataUsage.download)}</p>
      </div>
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Upload</p>
        <p className="font-semibold text-lg text-slate-900 dark:text-white">{formatBytes(dataUsage.upload)}</p>
      </div>
      <div className="col-span-3 mt-2">
        <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
        <p className="font-semibold text-lg text-slate-900 dark:text-white">{formatTime(connectionTime)}</p>
      </div>
    </div>
  );
};

export default StatsDisplay;
