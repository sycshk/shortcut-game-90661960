import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Brain, CheckCircle, XCircle, Lightbulb, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  QuizQuestion, 
  CONSOLIDATION_QUESTIONS, 
  shuffleQuestions,
  getQuestionsByCategory,
  getQuestionsByTool,
  EPM_TOOL_CONFIG,
  EPMTool
} from '@/data/consolidationQuiz';

interface ConsolidationQuizProps {
  onBack: () => void;
  onScoreSave: (score: number, accuracy: number) => void;
  userEmail?: string;
}

type QuizCategory = 'all' | 'budget' | 'consolidation' | 'kpi' | 'general' | EPMTool;

const CATEGORY_LABELS: Record<QuizCategory, { label: string; icon: string; color: string }> = {
  all: { label: 'All Topics', icon: '📚', color: 'text-primary' },
  budget: { label: 'Budget Planning', icon: '💰', color: 'text-green-500' },
  consolidation: { label: 'Financial Consolidation', icon: '🏢', color: 'text-blue-500' },
  kpi: { label: 'KPI Development', icon: '📊', color: 'text-purple-500' },
  general: { label: 'General EPM', icon: '⚡', color: 'text-orange-500' },
  // Tool-specific categories
  oracle_fccs: { label: 'Oracle FCCS', icon: '🔷', color: 'text-red-500' },
  oracle_pbcs: { label: 'Oracle PBCS', icon: '🔶', color: 'text-orange-500' },
  jedox: { label: 'Jedox', icon: '🟢', color: 'text-green-500' },
  netsuite: { label: 'NetSuite EPM', icon: '🟠', color: 'text-amber-500' },
  tagetik: { label: 'CCH Tagetik', icon: '🟣', color: 'text-purple-500' },
};

const POINTS_PER_QUESTION = 10;
const TIME_PER_QUESTION = 30;

export const ConsolidationQuiz = ({ onBack, onScoreSave, userEmail }: ConsolidationQuizProps) => {
  const [stage, setStage] = useState<'setup' | 'playing' | 'results'>('setup');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIME_PER_QUESTION);
  const [highScore, setHighScore] = useState(0);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem(`epm-quiz-highscore-${userEmail || 'guest'}`);
    if (saved) setHighScore(parseInt(saved, 10));
  }, [userEmail]);

  // Start quiz
  const startQuiz = useCallback(() => {
    let categoryQuestions: QuizQuestion[];
    
    if (selectedCategory === 'all') {
      categoryQuestions = CONSOLIDATION_QUESTIONS;
    } else if (['oracle_fccs', 'oracle_pbcs', 'jedox', 'netsuite', 'tagetik'].includes(selectedCategory)) {
      categoryQuestions = getQuestionsByTool(selectedCategory as EPMTool);
    } else {
      categoryQuestions = getQuestionsByCategory(selectedCategory as 'budget' | 'consolidation' | 'kpi' | 'general');
    }
    
    const shuffled = shuffleQuestions(categoryQuestions, Math.min(10, categoryQuestions.length));
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeRemaining(TIME_PER_QUESTION);
    setStage('playing');
  }, [selectedCategory]);

  // Timer
  useEffect(() => {
    if (stage !== 'playing' || showExplanation) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleAnswer(-1); // Time out
          return TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, showExplanation, currentIndex]);

  // Handle answer selection
  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    const currentQuestion = questions[currentIndex];
    const isCorrect = answerIndex === currentQuestion.correctIndex;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (isCorrect) {
      const timeBonus = Math.floor(timeRemaining / 3);
      setScore(prev => prev + POINTS_PER_QUESTION + timeBonus);
      setCorrectAnswers(prev => prev + 1);
    }
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentIndex >= questions.length - 1) {
      // Quiz complete
      const finalAccuracy = Math.round((correctAnswers / questions.length) * 100);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(`epm-quiz-highscore-${userEmail || 'guest'}`, score.toString());
      }
      onScoreSave(score, finalAccuracy);
      setStage('results');
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeRemaining(TIME_PER_QUESTION);
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // Setup Screen
  if (stage === 'setup') {
    return (
      <div className="flex min-h-screen items-center justify-center animated-bg p-4">
        <Card className="glass-card w-full max-w-lg">
          <CardHeader>
            <Button variant="ghost" size="sm" onClick={onBack} className="w-fit -ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">EPM Knowledge Quiz</CardTitle>
                <CardDescription>Test your Enterprise Performance Management expertise</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">High Score</span>
              <span className="font-bold text-primary flex items-center gap-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                {highScore}
              </span>
            </div>

            <div>
              <h3 className="font-medium mb-3">Select Topic</h3>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(CATEGORY_LABELS) as [QuizCategory, typeof CATEGORY_LABELS['all']][]).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={cn(
                      'p-3 rounded-lg border-2 transition-all text-left',
                      selectedCategory === key
                        ? 'border-primary bg-primary/10'
                        : 'border-muted-foreground/20 hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{value.icon}</span>
                      <span className={cn('font-medium text-sm', value.color)}>{value.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground text-center">
              10 questions • {TIME_PER_QUESTION}s per question • Time bonus for fast answers
            </div>

            <Button onClick={startQuiz} size="lg" className="w-full">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results Screen
  if (stage === 'results') {
    const accuracy = Math.round((correctAnswers / questions.length) * 100);
    const isPerfect = correctAnswers === questions.length;

    return (
      <div className="flex min-h-screen items-center justify-center animated-bg p-4">
        <Card className="glass-card w-full max-w-lg text-center">
          <CardHeader>
            <div className="mx-auto text-6xl mb-4">
              {isPerfect ? '🏆' : accuracy >= 70 ? '🎉' : accuracy >= 50 ? '👍' : '📚'}
            </div>
            <CardTitle className="text-2xl">
              {isPerfect ? 'Perfect Score!' : accuracy >= 70 ? 'Great Job!' : accuracy >= 50 ? 'Good Effort!' : 'Keep Learning!'}
            </CardTitle>
            <CardDescription>
              {CATEGORY_LABELS[selectedCategory].label} Quiz Complete
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-2xl font-bold text-green-500">{correctAnswers}/{questions.length}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-2xl font-bold text-blue-500">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>

            {score > highScore - 10 && score <= highScore && (
              <div className="text-sm text-yellow-500">
                Close to your high score!
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={startQuiz} className="flex-1">
                Play Again
              </Button>
              <Button onClick={() => setStage('setup')} variant="outline" className="flex-1">
                Change Topic
              </Button>
            </div>
            <Button onClick={onBack} variant="ghost" className="w-full">
              Back to Games
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Playing Screen
  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <Card className="glass-card w-full max-w-2xl">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-primary">Score: {score}</span>
              <div className={cn(
                'flex items-center gap-1 px-3 py-1 rounded-full',
                timeRemaining <= 10 ? 'bg-red-500/20 text-red-500' : 'bg-muted'
              )}>
                <Timer className="h-4 w-4" />
                <span className="font-mono font-bold">{timeRemaining}s</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Topic Badge */}
          <div className="flex items-center gap-2">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              'bg-muted'
            )}>
              {currentQuestion.topic}
            </span>
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium capitalize',
              currentQuestion.difficulty === 'beginner' && 'bg-green-500/20 text-green-500',
              currentQuestion.difficulty === 'intermediate' && 'bg-yellow-500/20 text-yellow-500',
              currentQuestion.difficulty === 'advanced' && 'bg-red-500/20 text-red-500'
            )}>
              {currentQuestion.difficulty}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-medium leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctIndex;
              const showResult = showExplanation;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    !showResult && 'hover:border-primary hover:bg-primary/5',
                    !showResult && !isSelected && 'border-muted-foreground/20',
                    showResult && isCorrect && 'border-green-500 bg-green-500/10',
                    showResult && isSelected && !isCorrect && 'border-red-500 bg-red-500/10',
                    showResult && !isCorrect && !isSelected && 'opacity-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full font-medium text-sm',
                      showResult && isCorrect ? 'bg-green-500 text-white' :
                      showResult && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                      'bg-muted'
                    )}>
                      {showResult && isCorrect ? <CheckCircle className="h-5 w-5" /> :
                       showResult && isSelected && !isCorrect ? <XCircle className="h-5 w-5" /> :
                       String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-500 mb-1">Explanation</div>
                  <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <Button onClick={nextQuestion} size="lg" className="w-full">
              {currentIndex >= questions.length - 1 ? 'See Results' : 'Next Question'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
