import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { WelcomeScreen } from './WelcomeScreen';
import { SetupScreen } from './SetupScreen';
import { GameplayScreen } from './GameplayScreen';
import { ResultsScreen } from './ResultsScreen';
import { LeaderboardScreen } from './LeaderboardScreen';

export const ShortcutGame = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { 
    state, 
    feedback, 
    startSetup, 
    startGame, 
    checkAnswer, 
    resetGame, 
    toggleHint,
    getLeaderboard, 
    saveToLeaderboard 
  } = useGameState();

  if (showLeaderboard) {
    return (
      <LeaderboardScreen 
        entries={getLeaderboard()} 
        onBack={() => setShowLeaderboard(false)} 
      />
    );
  }

  switch (state.status) {
    case 'welcome':
      return (
        <WelcomeScreen 
          onStart={startSetup} 
          onViewLeaderboard={() => setShowLeaderboard(true)} 
        />
      );
    
    case 'setup':
      return (
        <SetupScreen 
          onStart={(difficulty, level) => startGame(difficulty, level)} 
          onBack={resetGame} 
        />
      );
    
    case 'playing':
      return (
        <GameplayScreen 
          state={state} 
          feedback={feedback} 
          onAnswer={checkAnswer}
          onToggleHint={toggleHint}
        />
      );
    
    case 'results':
      return (
        <ResultsScreen 
          state={state} 
          onPlayAgain={startSetup} 
          onHome={resetGame} 
          onSaveScore={saveToLeaderboard} 
        />
      );
    
    default:
      return null;
  }
};
