
import React from 'react';
import { Bot, FileText, StickyNote, CheckSquare, MessageCircle } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onChatOpen: () => void;
  isChatOpen: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentView, onViewChange, onChatOpen, isChatOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Bot },
    { id: 'prompts', label: 'Prompts', icon: FileText },
    { id: 'notes', label: 'Notes', icon: StickyNote },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
  ];

  return (
    <nav className="sticky top-14 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-40">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === 'chat' ? isChatOpen : currentView === item.id;
          const handleClick = () => {
            if (item.id === 'chat') {
              onChatOpen();
            } else {
              onViewChange(item.id);
            }
          };
          return (
            <button
              key={item.id}
              onClick={handleClick}
              className={`flex flex-col items-center justify-center space-y-1 min-w-0 flex-1 py-2 transition-colors duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
              <span className={`text-xs font-medium ${isActive ? 'text-primary' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
