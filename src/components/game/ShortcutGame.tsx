import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { LoginScreen } from './LoginScreen';
import { WelcomeScreen } from './WelcomeScreen';
import { SetupScreen } from './SetupScreen';
import { GameplayScreen } from './GameplayScreen';
import { ResultsScreen } from './ResultsScreen';
import { AnalyticsScreen } from './AnalyticsScreen';
import { leaderboardService } from '@/services/leaderboardService';

const USER_SESSION_KEY = 'elufa-user-session';

export const ShortcutGame = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  
  const { 
    state, 
    feedback, 
    startSetup, 
    startGame, 
    checkAnswer, 
    handleMultipleChoiceAnswer,
    resetGame, 
    toggleHint,
    saveToLeaderboard,
    goToAnalytics,
    handlePause,
  } = useGameState();

  // Check for existing session on mount
  useEffect(() => {
    const loadSession = async () => {
      const savedEmail = localStorage.getItem(USER_SESSION_KEY);
      if (savedEmail) {
        setUserEmail(savedEmail);
        
        // Load profile
        const profile = leaderboardService.getProfile(savedEmail);
        if (profile) {
          setDisplayName(profile.displayName);
        } else {
          setDisplayName(savedEmail.split('@')[0]);
        }
      }
      setIsCheckingSession(false);
    };
    loadSession();
  }, []);

  const handleLogin = (email: string) => {
    localStorage.setItem(USER_SESSION_KEY, email);
    setUserEmail(email);
    
    // Create or update profile
    let profile = leaderboardService.getProfile(email);
    if (!profile) {
      profile = {
        email,
        displayName: email.split('@')[0],
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      };
      leaderboardService.saveProfile(profile);
    }
    setDisplayName(profile.displayName);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_SESSION_KEY);
    setUserEmail(null);
    setDisplayName('');
    resetGame();
  };

  // Show loading while checking session
  if (isCheckingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center animated-bg">
        <div className="glass-card p-8">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
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
          onAnalytics={goToAnalytics}
          userEmail={userEmail}
          onLogout={handleLogout}
        />
      );
    
    case 'analytics':
      return (
        <AnalyticsScreen
          onBack={resetGame}
          userEmail={userEmail}
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
          onMultipleChoiceAnswer={handleMultipleChoiceAnswer}
          onToggleHint={toggleHint}
          onPause={handlePause}
        />
      );
    
    case 'results':
      return (
        <ResultsScreen 
          state={state} 
          onPlayAgain={startSetup} 
          onHome={resetGame} 
          onSaveScore={saveToLeaderboard}
          onAnalytics={goToAnalytics}
          userEmail={userEmail}
          displayName={displayName}
        />
      );
    
    default:
      return null;
  }
};
