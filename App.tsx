import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ConnectionStatus, Server, Theme, Protocol } from './types';
import { SERVERS } from './constants';
import Header from './components/Header';
import ConnectionDisplay from './components/ConnectionDisplay';
import ServerSelector from './components/ServerSelector';
import StatsDisplay from './components/StatsDisplay';
import SettingsModal from './components/SettingsModal';
import { SettingsIcon } from './components/icons/SettingsIcon';

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('dark');
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.Disconnected);
    const [selectedServer, setSelectedServer] = useState<Server | null>(null);
    const [currentIp, setCurrentIp] = useState('127.0.0.1');
    const [connectionTime, setConnectionTime] = useState(0);
    const [dataUsage, setDataUsage] = useState({ download: 0, upload: 0 });
    const [ping, setPing] = useState<number | null>(null);
    const [isServerSelectorOpen, setServerSelectorOpen] = useState(false);
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

    // Settings states
    const [protocol, setProtocol] = useState<Protocol>('WireGuard');
    const [killSwitch, setKillSwitch] = useState(true);
    const [splitTunneling, setSplitTunneling] = useState(false);

    const fastestServer = useMemo(() => SERVERS.find(s => s.country === 'Switzerland'), []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
        let timer: ReturnType<typeof setInterval>;
        if (connectionStatus === ConnectionStatus.Connected) {
            timer = setInterval(() => {
                setConnectionTime(prev => prev + 1);
                setDataUsage(prev => ({
                    download: prev.download + Math.random() * 100,
                    upload: prev.upload + Math.random() * 20,
                }));
                setPing(Math.floor(20 + Math.random() * 30));
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [connectionStatus]);

    const handleConnectToggle = useCallback(() => {
        if (connectionStatus === ConnectionStatus.Connected || connectionStatus === ConnectionStatus.Connecting) {
            setConnectionStatus(ConnectionStatus.Disconnecting);
            setTimeout(() => {
                setConnectionStatus(ConnectionStatus.Disconnected);
                setCurrentIp('127.0.0.1');
                setConnectionTime(0);
                setDataUsage({ download: 0, upload: 0 });
                setPing(null);
            }, 1000);
        } else {
            const serverToConnect = selectedServer || fastestServer;
            if (serverToConnect) {
                setSelectedServer(serverToConnect);
                setConnectionStatus(ConnectionStatus.Connecting);
                setTimeout(() => {
                    setConnectionStatus(ConnectionStatus.Connected);
                    setCurrentIp(serverToConnect.ip);
                }, 2000);
            } else {
                // Should not happen if fastestServer is set
                alert("Please select a server first.");
            }
        }
    }, [connectionStatus, selectedServer, fastestServer]);

    const handleServerSelect = (server: Server | null) => {
        // If null, it means 'Fastest Server' was selected
        const newServer = server || fastestServer;
        setSelectedServer(newServer);
        setServerSelectorOpen(false);
        if (connectionStatus === ConnectionStatus.Connected) {
            // Reconnect logic
            setConnectionStatus(ConnectionStatus.Disconnecting);
            setTimeout(() => {
                handleConnectToggle();
            }, 500);
        }
    };

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
            <Header theme={theme} onToggleTheme={toggleTheme} />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto bg-slate-200/50 dark:bg-slate-800/50 rounded-3xl shadow-2xl backdrop-blur-xl p-6 md:p-8 space-y-8">
                    <ConnectionDisplay
                        status={connectionStatus}
                        onToggleConnect={handleConnectToggle}
                    />
                    <StatsDisplay
                        status={connectionStatus}
                        ping={ping}
                        dataUsage={dataUsage}
                        connectionTime={connectionTime}
                    />
                    <div
                        onClick={() => setServerSelectorOpen(true)}
                        className="cursor-pointer bg-slate-300/50 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300 rounded-xl p-4 flex justify-between items-center"
                    >
                        <div className="flex items-center space-x-4">
                             <img src={`https://flagcdn.com/w40/${(selectedServer || fastestServer)?.countryCode.toLowerCase()}.png`} alt={(selectedServer || fastestServer)?.country} className="w-10 h-auto rounded-md" />
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{(selectedServer || fastestServer)?.country}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{(selectedServer || fastestServer)?.city}</p>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Change</p>
                    </div>
                </div>
                 <button onClick={() => setSettingsModalOpen(true)} className="mt-8 flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <SettingsIcon className="w-5 h-5" />
                    <span>Settings</span>
                </button>
            </main>
            <ServerSelector
                isOpen={isServerSelectorOpen}
                onClose={() => setServerSelectorOpen(false)}
                servers={SERVERS}
                onSelect={handleServerSelect}
                fastestServer={fastestServer!}
            />
            <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setSettingsModalOpen(false)}
                protocol={protocol}
                setProtocol={setProtocol}
                killSwitch={killSwitch}
                setKillSwitch={setKillSwitch}
                splitTunneling={splitTunneling}
                setSplitTunneling={setSplitTunneling}
            />
        </div>
    );
};

export default App;