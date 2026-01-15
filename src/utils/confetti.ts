import confetti from 'canvas-confetti';

// Streak milestone confetti (10x streak)
export const triggerStreakConfetti = () => {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#0047AB', '#E31837', '#FFD700'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#0047AB', '#E31837', '#FFD700'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

// Perfect game confetti (100% accuracy)
export const triggerPerfectGameConfetti = () => {
  const duration = 4000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#0047AB', '#E31837', '#FFD700', '#00C853', '#AA00FF'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#0047AB', '#E31837', '#FFD700', '#00C853', '#AA00FF'],
    });
  }, 250);
};

// Simple celebration burst
export const triggerCelebration = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0047AB', '#E31837', '#FFD700'],
  });
};

// Fireworks effect
export const triggerFireworks = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 45, spread: 360, ticks: 50, zIndex: 9999 };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti({
      ...defaults,
      particleCount: 30,
      origin: { 
        x: Math.random(), 
        y: Math.random() * 0.4 
      },
      colors: ['#0047AB', '#E31837', '#FFD700'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });
  }, 300);
};
