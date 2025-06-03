
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingAIButtonProps {
  onClick: () => void;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-50"
      size="icon"
    >
      <Bot className="h-6 w-6" />
    </Button>
  );
};
