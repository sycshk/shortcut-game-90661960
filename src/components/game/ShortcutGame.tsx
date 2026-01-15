import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { LoginScreen } from './LoginScreen';
import { WelcomeScreen } from './WelcomeScreen';
import { SetupScreen } from './SetupScreen';
import { GameplayScreen } from './GameplayScreen';
import { ResultsScreen } from './ResultsScreen';

const USER_SESSION_KEY = 'elufa-user-session';

export const ShortcutGame = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  
  const { 
    state, 
    feedback, 
    startSetup, 
    startGame, 
    checkAnswer, 
    resetGame, 
    toggleHint,
    saveToLeaderboard 
  } = useGameState();

  // Check for existing session on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem(USER_SESSION_KEY);
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
    setIsCheckingSession(false);
  }, []);

  const handleLogin = (email: string) => {
    localStorage.setItem(USER_SESSION_KEY, email);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_SESSION_KEY);
    setUserEmail(null);
    resetGame();
  };

  // Show loading while checking session
  if (isCheckingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center animated-bg">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!userEmail) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  switch (state.status) {
    case 'welcome':
      return (
        <WelcomeScreen 
          onStart={startSetup}
          userEmail={userEmail}
          onLogout={handleLogout}
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
          userEmail={userEmail}
        />
      );
    
    default:
      return null;
  }
};
