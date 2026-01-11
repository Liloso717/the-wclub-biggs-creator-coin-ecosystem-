export enum AppView {
  HOME = 'HOME',
  TOKEN = 'TOKEN',
  CHAT = 'CHAT',
  LEADERBOARD = 'LEADERBOARD',
  PROMOTE = 'PROMOTE',
  EARN = 'EARN',
  GAMES = 'GAMES',
  MARKETS = 'MARKETS',
  MERCH = 'MERCH',
  TIPS = 'TIPS',
  DEFI = 'DEFI',
  PROFILE = 'PROFILE'
}

export interface WallMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  likes: number;
  tag: 'General' | 'Hype' | 'Alpha' | 'Meme';
  isVerified?: boolean;
}

export interface TokenDataPoint {
  time: string;
  price: number;
  volume: number;
}