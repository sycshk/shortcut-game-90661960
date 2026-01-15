import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Allowed email domains (not shown to users)
const ALLOWED_DOMAINS = ['elufasys.com', 'tw.elufasys.com', '3peaks.tech', 'novus-consulting.com'];

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

// Custom Keyboard Shortcut Icon Component
const ShortcutKeyIcon = () => (
  <div className="relative flex items-center gap-1">
    {/* Ctrl Key */}
    <div className="shortcut-icon-key w-12 h-10 rounded-lg text-xs text-primary" style={{ animationDelay: '0s' }}>
      Ctrl
    </div>
    {/* Plus symbol */}
    <span className="text-primary/60 text-lg font-light mx-0.5">+</span>
    {/* S Key */}
    <div className="shortcut-icon-key w-10 h-10 rounded-lg text-lg text-primary" style={{ animationDelay: '0.5s' }}>
      S
    </div>
  </div>
);

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    const domain = email.split('@')[1].toLowerCase();
    if (!ALLOWED_DOMAINS.includes(domain)) {
      setError('Please use your organization email address');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email.trim())) {
      return;
    }

    setIsLoading(true);
    // Simulate brief loading
    setTimeout(() => {
      onLogin(email.trim());
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <Card className="w-full max-w-md glass-card animate-fade-in">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto flex h-24 w-auto items-center justify-center rounded-2xl bg-primary/5 p-4 glow-primary">
            <ShortcutKeyIcon />
          </div>
          <div>
            <CardTitle className="text-2xl font-display font-bold text-gradient">
              Shortcut Master
            </CardTitle>
            <CardDescription className="mt-2">
              Sign in with your organization email to continue
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Organization Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={cn(
                  'h-12 glass-button',
                  error && 'border-destructive focus-visible:ring-destructive'
                )}
                disabled={isLoading}
                autoComplete="email"
                autoFocus
              />
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="btn-elufa w-full h-12 text-base"
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"></span>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Continue
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
