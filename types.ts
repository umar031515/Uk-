
export enum ConnectionStatus {
  Disconnected = 'DISCONNECTED',
  Connecting = 'CONNECTING',
  Connected = 'CONNECTED',
  Disconnecting = 'DISCONNECTING',
}

export interface Server {
  country: string;
  countryCode: string;
  city: string;
  ip: string;
}

export type Theme = 'light' | 'dark';

export type Protocol = 'OpenVPN' | 'WireGuard' | 'IKEv2';
