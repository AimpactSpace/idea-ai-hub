
import React from 'react';
import { User, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

export const TopHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <h1 className="text-lg font-bold">Productivity Hub</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span className="text-sm">Sign In</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
