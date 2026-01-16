import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, Trophy, RefreshCw, ArrowUp, ArrowDown, ArrowLeftIcon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiService } from '@/services/apiService';

interface SnakeGameProps {
  onBack: () => void;
  onScoreSave: (score: number) => void;
  userEmail?: string;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 16;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 5;
const MIN_SPEED = 50;

export const SnakeGame = ({ onBack, onScoreSave, userEmail }: SnakeGameProps) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const directionRef = useRef(direction);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Load high score from API or localStorage
  useEffect(() => {
    const loadHighScore = async () => {
      if (userEmail) {
        try {
          const result = await apiService.getMiniGameScores(userEmail);
          if (result.data?.scores?.snake) {
            setHighScore(result.data.scores.snake.highScore);
            return;
          }
        } catch (error) {
          console.warn('Failed to load high score from API:', error);
        }
      }
      // Fallback to localStorage
      const saved = localStorage.getItem(`snake-highscore-${userEmail || 'guest'}`);
      if (saved) setHighScore(parseInt(saved, 10));
    };
    loadHighScore();
  }, [userEmail]);

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setIsPlaying(false);
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  }, [generateFood]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        const currentDirection = directionRef.current;

        switch (currentDirection) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => {
            const newScore = prev + 10;
            // Update high score locally (will sync to server on game over)
            if (newScore > highScore) {
              setHighScore(newScore);
            }
            return newScore;
          });
          setFood(generateFood(newSnake));
          setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_INCREASE));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, food, speed, generateFood, highScore, userEmail]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying && !gameOver && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        setIsPlaying(true);
        return;
      }

      const keyDirections: Record<string, Direction> = {
        ArrowUp: 'UP', w: 'UP', W: 'UP',
        ArrowDown: 'DOWN', s: 'DOWN', S: 'DOWN',
        ArrowLeft: 'LEFT', a: 'LEFT', A: 'LEFT',
        ArrowRight: 'RIGHT', d: 'RIGHT', D: 'RIGHT',
      };

      const newDirection = keyDirections[e.key];
      if (!newDirection) return;

      e.preventDefault();

      // Prevent reversing direction
      const opposites: Record<Direction, Direction> = {
        UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
      };

      if (opposites[newDirection] !== directionRef.current) {
        directionRef.current = newDirection;
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Save score on game over - sync to server
  useEffect(() => {
    const saveScore = async () => {
      if (gameOver && score > 0) {
        // Save to localStorage as backup
        if (score > highScore) {
          localStorage.setItem(`snake-highscore-${userEmail || 'guest'}`, score.toString());
        }
        
        // Sync to server API
        if (userEmail) {
          try {
            const result = await apiService.saveMiniGameScore({
              email: userEmail,
              game_type: 'snake',
              score: score
            });
            
            if (result.data?.isNewHighScore) {
              console.log('🎉 New high score saved to server!');
            }
          } catch (error) {
            console.warn('Failed to save score to server:', error);
          }
        }
        
        onScoreSave(score);
      }
    };
    saveScore();
  }, [gameOver, score, onScoreSave, userEmail, highScore]);

  // Touch/mobile controls
  const handleDirectionClick = (newDirection: Direction) => {
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
    };
    if (opposites[newDirection] !== directionRef.current) {
      directionRef.current = newDirection;
      setDirection(newDirection);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <Card className="glass-card w-full max-w-md">
        <CardHeader className="pb-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="w-fit -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                🐍 Snake
              </CardTitle>
              <CardDescription>Eat food, grow longer, don't crash!</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">High Score</div>
              <div className="font-bold text-primary flex items-center gap-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                {highScore}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Score Display */}
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">Score: {score}</div>
            <div className="text-sm text-muted-foreground">
              Speed: {Math.round((INITIAL_SPEED - speed) / SPEED_INCREASE) + 1}x
            </div>
          </div>

          {/* Game Board */}
          <div 
            className="relative mx-auto border-2 border-primary/30 rounded-lg overflow-hidden bg-background/50"
            style={{ 
              width: GRID_SIZE * CELL_SIZE, 
              height: GRID_SIZE * CELL_SIZE 
            }}
          >
            {/* Grid lines */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
              }}
            />
            
            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className={cn(
                  'absolute rounded-sm transition-all duration-75',
                  index === 0 
                    ? 'bg-primary shadow-lg shadow-primary/50' 
                    : 'bg-primary/70'
                )}
                style={{
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  width: CELL_SIZE - 1,
                  height: CELL_SIZE - 1,
                }}
              />
            ))}

            {/* Food */}
            <div
              className="absolute bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"
              style={{
                left: food.x * CELL_SIZE + 2,
                top: food.y * CELL_SIZE + 2,
                width: CELL_SIZE - 4,
                height: CELL_SIZE - 4,
              }}
            />

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-destructive mb-2">Game Over!</div>
                <div className="text-lg mb-4">Final Score: {score}</div>
                <Button onClick={resetGame} size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Play Again
                </Button>
              </div>
            )}

            {/* Start Screen */}
            {!isPlaying && !gameOver && (
              <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center">
                <div className="text-lg font-medium mb-4">Press Space or Start to Play</div>
                <Button onClick={() => setIsPlaying(true)} size="lg">
                  <Play className="mr-2 h-5 w-5" />
                  Start
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDirectionClick('UP')}
              disabled={!isPlaying}
              className="h-10 w-10"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDirectionClick('LEFT')}
                disabled={!isPlaying}
                className="h-10 w-10"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => isPlaying ? setIsPlaying(false) : setIsPlaying(true)}
                className="h-10 w-10"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDirectionClick('RIGHT')}
                disabled={!isPlaying}
                className="h-10 w-10"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDirectionClick('DOWN')}
              disabled={!isPlaying}
              className="h-10 w-10"
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground text-center">
            Use Arrow Keys or WASD to move • Space to start/pause
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
