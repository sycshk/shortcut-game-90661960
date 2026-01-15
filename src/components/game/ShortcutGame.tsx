import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { LoginScreen } from './LoginScreen';
import { WelcomeScreen } from './WelcomeScreen';
import { SetupScreen } from './SetupScreen';
import { GameplayScreen } from './GameplayScreen';
import { ResultsScreen } from './ResultsScreen';
import { AnalyticsScreen } from './AnalyticsScreen';
import { DailyChallengeScreen } from './DailyChallengeScreen';
import { leaderboardService, UserProfileData } from '@/services/leaderboardService';
import { getDailyShortcuts, saveDailyChallengeCompletion } from '@/services/dailyChallengeService';

const USER_SESSION_KEY = 'shortcut-user-session';

export const ShortcutGame = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isDailyMode, setIsDailyMode] = useState(false);
  
  const { 
    state, 
    feedback, 
    startSetup, 
    startGame,
    startDailyChallenge,
    checkAnswer, 
    handleMultipleChoiceAnswer,
    resetGame, 
    toggleHint,
    saveToLeaderboard,
    goToAnalytics,
    goToDailyChallenge,
    handlePause,
  } = useGameState();

  // Check for existing session on mount
  useEffect(() => {
    const loadSession = async () => {
      const savedEmail = localStorage.getItem(USER_SESSION_KEY);
      if (savedEmail) {
        setUserEmail(savedEmail);
        
        // Load profile
        const profile = await leaderboardService.getProfile(savedEmail);
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

  const handleLogin = async (email: string) => {
    localStorage.setItem(USER_SESSION_KEY, email);
    setUserEmail(email);
    
    // Create or update profile
    let profile = await leaderboardService.getProfile(email);
    if (!profile) {
      const newProfile: UserProfileData = {
        email,
        displayName: email.split('@')[0],
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      };
      await leaderboardService.saveProfile(newProfile);
      profile = newProfile;
    }
    setDisplayName(profile.displayName);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_SESSION_KEY);
    setUserEmail(null);
    setDisplayName('');
    setIsDailyMode(false);
    resetGame();
  };

  const handleStartDailyChallenge = () => {
    setIsDailyMode(true);
    const dailyShortcuts = getDailyShortcuts();
    startDailyChallenge(dailyShortcuts);
  };

  const handleDailyChallengeComplete = (name: string) => {
    // Save to leaderboard
    saveToLeaderboard(name);
    
    // Save daily challenge completion
    const accuracy = Math.round((state.correctAnswers / state.totalQuestions) * 100);
    saveDailyChallengeCompletion(state.score, accuracy, userEmail || undefined);
    
    setIsDailyMode(false);
  };

  const handleBackFromDaily = () => {
    setIsDailyMode(false);
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

  const renderScreen = () => {
    switch (state.status) {
      case 'welcome':
        return (
          <WelcomeScreen 
            onStart={startSetup}
            onAnalytics={goToAnalytics}
            onDailyChallenge={goToDailyChallenge}
            userEmail={userEmail}
            onLogout={handleLogout}
          />
        );
      
      case 'dailyChallenge':
        return (
          <DailyChallengeScreen
            onBack={handleBackFromDaily}
            onStartChallenge={handleStartDailyChallenge}
            userEmail={userEmail}
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
            onPlayAgain={isDailyMode ? handleBackFromDaily : startSetup} 
            onHome={() => { setIsDailyMode(false); resetGame(); }} 
            onSaveScore={isDailyMode ? handleDailyChallengeComplete : saveToLeaderboard}
            onAnalytics={goToAnalytics}
            userEmail={userEmail}
            displayName={displayName}
            isDailyChallenge={isDailyMode}
          />
        );
      
      default:
        return null;
    }
  };

  return renderScreen();
};
