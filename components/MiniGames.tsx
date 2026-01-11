import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, RotateCcw, ChevronLeft, Hand, Scissors, Scroll } from 'lucide-react';

type GameType = 'NONE' | 'RPS' | 'TTT';
type RPSChoice = 'ROCK' | 'PAPER' | 'SCISSORS' | null;
type TTTPlayer = 'X' | 'O';
type TTTCell = TTTPlayer | null;

const MiniGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType>('NONE');
  const [sessionScore, setSessionScore] = useState(0);

  // === ROCK PAPER SCISSORS STATE ===
  const [rpsChoice, setRpsChoice] = useState<RPSChoice>(null);
  const [computerChoice, setComputerChoice] = useState<RPSChoice>(null);
  const [rpsResult, setRpsResult] = useState<string>('');
  const [rpsStreak, setRpsStreak] = useState(0);

  // === TIC TAC TOE STATE ===
  const [board, setBoard] = useState<TTTCell[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // User is always X (starts)
  const [winner, setWinner] = useState<TTTPlayer | 'DRAW' | null>(null);

  // --- RPS LOGIC ---
  const playRPS = (choice: 'ROCK' | 'PAPER' | 'SCISSORS') => {
    const choices: ('ROCK' | 'PAPER' | 'SCISSORS')[] = ['ROCK', 'PAPER', 'SCISSORS'];
    const comp = choices[Math.floor(Math.random() * 3)];
    setRpsChoice(choice);
    setComputerChoice(comp);

    if (choice === comp) {
      setRpsResult("It's a Tie!");
    } else if (
      (choice === 'ROCK' && comp === 'SCISSORS') ||
      (choice === 'PAPER' && comp === 'ROCK') ||
      (choice === 'SCISSORS' && comp === 'PAPER')
    ) {
      setRpsResult('You Win! +100 $TWCB');
      setSessionScore(s => s + 100);
      setRpsStreak(s => s + 1);
    } else {
      setRpsResult('You Lose! -50 $TWCB');
      setSessionScore(s => Math.max(0, s - 50));
      setRpsStreak(0);
    }
  };

  const resetRPS = () => {
    setRpsChoice(null);
    setComputerChoice(null);
    setRpsResult('');
  };

  // --- TIC TAC TOE LOGIC ---
  const checkWinner = (squares: TTTCell[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'DRAW';
  };

  const handleTTTClick = (index: number) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false); // Turn over to AI
  };

  // Simple AI for TTT
  useEffect(() => {
    const win = checkWinner(board);
    if (win) {
      setWinner(win);
      if (win === 'X') {
          setSessionScore(s => s + 500);
      }
      return;
    }

    if (!isXNext && !winner) {
      // Computer Turn (Simple Random for now, but tries to block sometimes effectively by randomness)
      const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
      
      if (emptyIndices.length > 0) {
        const timeout = setTimeout(() => {
          const randIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = [...board];
          newBoard[randIdx] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }, 500); // Delay for realism
        return () => clearTimeout(timeout);
      }
    }
  }, [board, isXNext, winner]);

  const resetTTT = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  // --- RENDER ---
  if (activeGame === 'NONE') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 fade-in">
        <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                W Club Arcade
                </span>
            </h2>
            <p className="text-gray-400">Play mini-games, earn simulated $TWCB, and vibe.</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Trophy className="text-club-gold" size={16} />
                <span className="text-white font-bold">Session Winnings: {sessionScore} $TWCB</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
                onClick={() => setActiveGame('RPS')}
                className="group relative cursor-pointer bg-white/5 border border-white/10 hover:border-club-accent rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Hand size={120} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-club-accent transition-colors">Rock Paper Scissors</h3>
                    <p className="text-gray-400 mb-6">Classic showdown against the AI. Win streaks multiply rewards.</p>
                    <button className="px-6 py-2 bg-club-accent text-black font-bold rounded-lg hover:bg-cyan-300 transition-colors">Play Now</button>
                </div>
            </div>

            <div 
                onClick={() => setActiveGame('TTT')}
                className="group relative cursor-pointer bg-white/5 border border-white/10 hover:border-pink-500 rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] overflow-hidden"
            >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Gamepad2 size={120} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-500 transition-colors">Tic Tac Toe</h3>
                    <p className="text-gray-400 mb-6">Strategic grid warfare. Can you beat the W Club Bot?</p>
                    <button className="px-6 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-400 transition-colors">Play Now</button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in">
        <button 
            onClick={() => setActiveGame('NONE')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
            <ChevronLeft size={20} /> Back to Arcade
        </button>

        {activeGame === 'RPS' && (
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2 text-club-accent">Rock Paper Scissors</h2>
                <p className="text-gray-400 mb-8">Best of luck! Streak: <span className="text-white font-bold">{rpsStreak}</span></p>

                {rpsResult ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 max-w-lg mx-auto animate-in zoom-in duration-300">
                        <div className="flex justify-center items-center gap-8 mb-6">
                            <div className="text-center">
                                <p className="text-xs text-gray-400 uppercase mb-2">You</p>
                                <div className="text-5xl">{rpsChoice === 'ROCK' ? '🪨' : rpsChoice === 'PAPER' ? '📄' : '✂️'}</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-600">VS</div>
                            <div className="text-center">
                                <p className="text-xs text-gray-400 uppercase mb-2">Bot</p>
                                <div className="text-5xl">{computerChoice === 'ROCK' ? '🪨' : computerChoice === 'PAPER' ? '📄' : '✂️'}</div>
                            </div>
                        </div>
                        <h3 className={`text-2xl font-bold mb-6 ${rpsResult.includes('Win') ? 'text-green-400' : rpsResult.includes('Lose') ? 'text-red-400' : 'text-yellow-400'}`}>
                            {rpsResult}
                        </h3>
                        <button 
                            onClick={resetRPS}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center gap-2 mx-auto transition-colors"
                        >
                            <RotateCcw size={18} /> Play Again
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-6">
                        <button onClick={() => playRPS('ROCK')} className="group flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-club-accent/20 hover:border-club-accent hover:scale-105 transition-all">
                            <span className="text-6xl group-hover:scale-110 transition-transform">🪨</span>
                            <span className="font-bold">ROCK</span>
                        </button>
                        <button onClick={() => playRPS('PAPER')} className="group flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-club-accent/20 hover:border-club-accent hover:scale-105 transition-all">
                             <span className="text-6xl group-hover:scale-110 transition-transform">📄</span>
                             <span className="font-bold">PAPER</span>
                        </button>
                        <button onClick={() => playRPS('SCISSORS')} className="group flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-club-accent/20 hover:border-club-accent hover:scale-105 transition-all">
                             <span className="text-6xl group-hover:scale-110 transition-transform">✂️</span>
                             <span className="font-bold">SCISSORS</span>
                        </button>
                    </div>
                )}
            </div>
        )}

        {activeGame === 'TTT' && (
            <div className="text-center max-w-md mx-auto">
                 <h2 className="text-3xl font-bold mb-2 text-pink-500">Tic Tac Toe</h2>
                 <p className="text-gray-400 mb-8">Get 3 in a row to win 500 $TWCB</p>

                 <div className="bg-black/30 p-4 rounded-2xl border border-white/10 inline-block mb-6 relative">
                    <div className="grid grid-cols-3 gap-2">
                        {board.map((cell, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleTTTClick(idx)}
                                className={`w-24 h-24 rounded-xl text-4xl font-bold flex items-center justify-center transition-all ${
                                    cell === 'X' ? 'bg-pink-500/20 text-pink-500 border border-pink-500/50' :
                                    cell === 'O' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/50' :
                                    'bg-white/5 border border-white/5 hover:bg-white/10'
                                }`}
                                disabled={!!cell || !!winner}
                            >
                                {cell}
                            </button>
                        ))}
                    </div>
                    
                    {winner && (
                         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center animate-in fade-in">
                            <h3 className={`text-4xl font-bold mb-4 ${winner === 'X' ? 'text-pink-500' : winner === 'O' ? 'text-blue-500' : 'text-gray-300'}`}>
                                {winner === 'X' ? 'YOU WIN!' : winner === 'O' ? 'BOT WINS!' : 'DRAW!'}
                            </h3>
                             <button 
                                onClick={resetTTT}
                                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <RotateCcw size={16} /> Play Again
                            </button>
                         </div>
                    )}
                 </div>

                 <div className="flex justify-between items-center text-sm px-4">
                    <div className={`px-4 py-2 rounded-lg border ${isXNext && !winner ? 'bg-pink-500/20 border-pink-500 text-pink-500' : 'border-transparent text-gray-500'}`}>
                        Your Turn (X)
                    </div>
                    <div className={`px-4 py-2 rounded-lg border ${!isXNext && !winner ? 'bg-blue-500/20 border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}>
                        Bot Thinking...
                    </div>
                 </div>
            </div>
        )}
    </div>
  );
};

export default MiniGames;